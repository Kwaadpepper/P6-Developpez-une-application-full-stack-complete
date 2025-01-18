package com.openclassrooms.mddapi.service.auth;

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
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.dto.JwtDto;
import com.openclassrooms.mddapi.exception.exceptions.ServerErrorException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.lib.auth.ApiAuthenticationToken;
import com.openclassrooms.mddapi.model.Credential;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CredentialRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

import jakarta.transaction.Transactional;

/**
 * This service is used to authenticate users.
 */
@Service
public class AuthenticationService {
  private static final Logger logger = LogManager.getLogger(AuthenticationService.class);
  private final UserRepository userRepository;
  private final CredentialRepository credentialRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public AuthenticationService(
      final UserRepository userRepository,
      final CredentialRepository credentialRepository,
      final JwtService jwtService,
      final AuthenticationManager authenticationManager) {
    this.userRepository = userRepository;
    this.credentialRepository = credentialRepository;
    passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    this.jwtService = jwtService;
    this.authenticationManager = authenticationManager;
  }

  /**
   * Convert an {@link Authentication} to a {@link User}
   *
   * @param authentication The authentication to convert
   * @return {@link User}
   * @throws ServerErrorException If the principal is not a {@link User}
   */
  public User toUser(final Authentication authentication) throws ServerErrorException {
    final var principal = authentication.getPrincipal();

    if (!(principal instanceof Credential)) {
      logger.debug("Given authentication principal is not a Credential instance.");
      throw new ServerErrorException("Expected principal to be a '%s' instance given is '%s'"
          .formatted(Credential.class, principal.getClass()));
    }

    return ((Credential) principal).getUser();
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
        return toUser(auth);
      }
      return null;
    });
  }

  /**
   * Authenticate a user using login and password
   *
   * @param login    Can be email or username
   * @param password The user password
   * @return {@link JwtDto}
   * @throws BadCredentialsException
   */
  public JwtDto authenticate(final String login, final String password)
      throws BadCredentialsException {
    try {
      final var authentication = authenticationManager
          .authenticate(UsernamePasswordAuthenticationToken.unauthenticated(login, password));
      final var credential = toCredential(authentication);
      return getJwtTokenFrom(credential);
    } catch (LockedException | DisabledException e) {
      logger.debug("The use account is '%s'".formatted(e.getClass().getSimpleName()));
      throw new BadCredentialsException("Account cannot be used for the moment", e);
    }
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
      final var authentication = authenticationManager.authenticate(ApiAuthenticationToken.unauthenticated(apiToken));
      return toCredential(authentication);
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
   * @return
   * @throws ValidationException If email or username is already used.
   */
  @Transactional
  public JwtDto register(
      final String username,
      final String email,
      final String password)
      throws ValidationException {
    final User user;
    final Credential credential;

    if (userRepository.findByEmail(email).isPresent()) {
      logger.debug("The email is already used so we cannot create an account with it.");
      throw new ValidationException("There is already an account with this email");
    }

    if (userRepository.findByName(username).isPresent()) {
      logger.debug("The username is already used so we cannot create an account with it.");
      throw new ValidationException("There is already an account with this username");
    }

    user = new User(email);
    userRepository.save(user);

    credential = new Credential(passwordEncoder.encode(password), user);
    credentialRepository.save(credential);

    return getJwtTokenFrom(credential);
  }

  /**
   * Make a JWT token from credentials.
   *
   * @param credential {@link Credential} That contains apiToken.
   * @return {@link JwtDto}
   */
  private JwtDto getJwtTokenFrom(final Credential credential) {
    final var jwtToken = jwtService.generateToken(credential.getApiToken());
    return JwtDto.of(jwtToken);
  }
}
