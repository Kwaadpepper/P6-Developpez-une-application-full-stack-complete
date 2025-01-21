package com.openclassrooms.mddapi.service.auth;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.JwtAuthenticationFailureException;
import com.openclassrooms.mddapi.exception.exceptions.ServerErrorException;
import com.openclassrooms.mddapi.model.Credential;
import com.openclassrooms.mddapi.model.RefreshToken;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.CredentialRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class SessionService {
    private static final Logger logger = LogManager.getLogger(SessionService.class);
    private final CredentialRepository credentialRepository;
    private final RefreshTokenService refreshTokenService;
    private final CookieService cookieService;
    private final JwtService jwtService;

    public SessionService(
            final CredentialRepository credentialRepository,
            final RefreshTokenService refreshTokenService,
            final CookieService cookieService,
            final JwtService jwtService) {
        this.credentialRepository = credentialRepository;
        this.refreshTokenService = refreshTokenService;
        this.cookieService = cookieService;
        this.jwtService = jwtService;
    }

    public User getAuthenticatedUser() {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        return toUser(authentication);
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
     * Refresh the session from the request
     *
     * @param request The current request
     * @return {@link List} of {@link ResponseCookie}
     */
    @Transactional
    public List<ResponseCookie> refreshSessionFromRequest(
            final HttpServletRequest request) {

        final RefreshToken refreshToken = cookieService.getRefreshTokenUuidFromRequest(request)
                .map(uuidToken -> refreshTokenService.findByToken(uuidToken).orElse(null))
                .orElseThrow(() -> new JwtAuthenticationFailureException("Refresh token is missing from request"));
        final var user = refreshToken.getUser();
        final var credential = credentialRepository.findByUserUuid(user.getUuid())
                .orElseThrow(
                        () -> new IllegalStateException("Every user has to have credentials, DB is in invalid state."));
        final var apiToken = credential.getApiToken();
        final var jwtToken = jwtService.generateToken(apiToken);
        final RefreshToken newRefreshToken;

        newRefreshToken = refreshTokenService.getRefreshToken(user);

        return List.of(
                cookieService.generateRefreshJwtCookie(newRefreshToken),
                cookieService.generateJwtCookie(jwtToken));
    }
}
