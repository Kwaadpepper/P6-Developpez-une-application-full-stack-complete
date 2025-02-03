package com.openclassrooms.mddapi.service.auth;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ServerErrorException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException.ValidationError;
import com.openclassrooms.mddapi.model.Credential;
import com.openclassrooms.mddapi.model.RefreshToken;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.provider.auth.ApiAuthenticationToken;
import com.openclassrooms.mddapi.repository.CredentialRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.PasswordService;
import com.openclassrooms.mddapi.valueobject.AuthenticatedResponse;
import com.openclassrooms.mddapi.valueobject.Email;
import com.openclassrooms.mddapi.valueobject.JwtToken;
import com.openclassrooms.mddapi.valueobject.Password;
import com.openclassrooms.mddapi.valueobject.PasswordHash;

import jakarta.transaction.Transactional;

/**
 * This service is used to authenticate users.
 */
@Service
public class AuthenticationService {
  private static final Logger logger = LogManager.getLogger(AuthenticationService.class);
  private final AuthenticationManager authenticationManager;
  private final CookieService cookieService;
  private final CredentialRepository credentialRepository;
  private final JwtService jwtService;
  private final PasswordService passwordService;
  private final RefreshTokenService refreshTokenService;
  private final SessionService sessionService;
  private final UserRepository userRepository;

  public AuthenticationService(
      final SessionService sessionService,
      final AuthenticationManager authenticationManager,
      final CookieService cookieService,
      final CredentialRepository credentialRepository,
      final RefreshTokenService refreshTokenService,
      final JwtService jwtService,
      final PasswordService passwordService,
      final UserRepository userRepository) {
    this.authenticationManager = authenticationManager;
    this.cookieService = cookieService;
    this.credentialRepository = credentialRepository;
    this.jwtService = jwtService;
    this.passwordService = passwordService;
    this.refreshTokenService = refreshTokenService;
    this.sessionService = sessionService;
    this.userRepository = userRepository;
  }

  /**
   * Convert an {@link Authentication} to a {@link Credential}
   *
   * @param authentication The authentication to convert
   * @return {@link Credential}
   * @throws ServerErrorException If the principal is not a {@link Credential}
   */
  public static Credential toCredential(final Authentication authentication) throws ServerErrorException {
    final var principal = authentication.getPrincipal();

    if (!(principal instanceof Credential)) {
      logger.debug("Given authentication principal is not a Credential instance.");
      throw new ServerErrorException("Expected principal to be a '%s' instance given is '%s'"
          .formatted(Credential.class, principal.getClass()));
    }
    return (Credential) principal;
  }

  /**
   * Get the authenticated user from the security context.
   *
   * @return {@link Optional} of {@link User}
   */
  public Optional<User> getAuthenticatedUser() {
    var securityContext = SecurityContextHolder.getContext();
    var authentication = Optional.ofNullable(securityContext.getAuthentication());

    return authentication.map(auth -> {
      if (auth.isAuthenticated()) {
        return sessionService.toUser(auth);
      }
      return null;
    });
  }

  /**
   * Authenticate a user using ApiToken
   *
   * @param apiToken The user apiToken
   * @return {@link Credential}
   * @throws BadCredentialsException If user cannot be authenticated.
   */
  public Credential authenticate(final UUID apiToken) throws BadCredentialsException {
    try {
      final var apiAuthenticationToken = ApiAuthenticationToken.unauthenticated(apiToken);
      final var authentication = authenticationManager.authenticate(apiAuthenticationToken);
      return toCredential(authentication);
    } catch (LockedException | DisabledException e) {
      logger.debug("The use account is '%s'".formatted(e.getClass().getSimpleName()));
      throw new BadCredentialsException("Account cannot be used for the moment", e);
    }
  }

  /**
   * Authenticate a user using login and password
   *
   * @param login    Can be email or username
   * @param password The user password
   * @return {@link AuthenticatedResponse} containing the user and response
   *         cookies with jwt and refresh tokens.
   * @throws BadCredentialsException
   */
  public AuthenticatedResponse authenticate(final String login, final String password)
      throws BadCredentialsException {
    try {
      final var authentication = authenticationManager
          .authenticate(UsernamePasswordAuthenticationToken.unauthenticated(login, password));
      final var credential = toCredential(authentication);
      final var user = credential.getUser();
      final var apiToken = credential.getApiToken();
      final var jwtToken = jwtService.generateToken(apiToken);
      final RefreshToken refreshToken;

      refreshToken = refreshTokenService.getRefreshToken(user);

      return AuthenticatedResponse.of(
          List.of(cookieService.generateRefreshJwtCookie(refreshToken),
              cookieService.generateJwtCookie(jwtToken)),
          user);
    } catch (LockedException | DisabledException e) {
      logger.debug("The use account is '%s'".formatted(e.getClass().getSimpleName()));
      throw new BadCredentialsException("Account cannot be used for the moment", e);
    }
  }

  /**
   * Persist a new user an return a JWT Token
   *
   * @param username User name that shall be unique
   * @param email    Email Shall be unique
   * @param password Password
   * @return {@link AuthenticatedResponse} containing the user and response
   *         cookies with jwt and refresh tokens.
   * @throws ValidationException If email or username is already used.
   */
  @Transactional
  public AuthenticatedResponse register(
      final String username,
      final Email email,
      final Password password)
      throws ValidationException {
    final User user;
    final Credential credential;
    final UUID apiToken;
    final JwtToken jwtToken;
    final RefreshToken refreshToken;
    final PasswordHash passwordHash;

    if (userRepository.findByEmail(email).isPresent()) {
      logger.debug("The email is already used so we cannot create an account with it.");
      throw ValidationException.of(ValidationError.of("email", "There is already an account with this email"));
    }

    if (userRepository.findByName(username).isPresent()) {
      logger.debug("The username is already used so we cannot create an account with it.");
      throw ValidationException.of(ValidationError.of("username", "There is already an account with this username"));
    }

    user = new User(username, email);
    userRepository.save(user);

    refreshToken = refreshTokenService.getRefreshToken(user);
    passwordHash = passwordService.hash(password);
    credential = new Credential(passwordHash, user);
    credentialRepository.save(credential);

    apiToken = credential.getApiToken();
    jwtToken = jwtService.generateToken(apiToken);

    return AuthenticatedResponse.of(
        List.of(cookieService.generateRefreshJwtCookie(refreshToken),
            cookieService.generateJwtCookie(jwtToken)),
        user);
  }

}
