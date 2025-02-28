package com.openclassrooms.mddapi.service.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseCookie;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
import com.openclassrooms.mddapi.model.RefreshToken;
import com.openclassrooms.mddapi.valueobject.JwtToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class CookieService {

    private final String jwtCookieName;
    private final String jwtRefreshCookieName;

    private final String jwtCookieNameSuffix = "-jwt";
    private final String jwtRefreshCookieNameSuffix = "-refresh";

    private final Integer jwtCookieExpiration;
    private final Integer jwtRefreshCookieExpiration;

    private final String jwtCookieHttpPath = "/api";
    private final String jwtRefreshCookieHttpPath = "/api/auth/refresh-token";

    CookieService(final AppConfiguration appConfiguration) {
        final var jwtCookieName = appConfiguration.getJwtCookieName();
        final var jwtRefreshCookieName = appConfiguration.getJwtCookieName();
        final var jwtCookieExpiration = appConfiguration.getJwtTokenExpiration();
        final var jwtRefreshCookieExpiration = appConfiguration.getJwtRefreshExpiration();

        this.jwtCookieName = jwtCookieName;
        this.jwtRefreshCookieName = jwtRefreshCookieName;
        this.jwtCookieExpiration = jwtCookieExpiration;
        this.jwtRefreshCookieExpiration = jwtRefreshCookieExpiration;
    }

    /**
     * Generate Jwt Cookie
     *
     * @param jwtToken {@link JwtToken}
     * @return {@link ResponseCookie}
     */
    public ResponseCookie generateJwtCookie(final JwtToken jwtToken) {
        return generateCookie(
                jwtCookieName + jwtCookieNameSuffix,
                jwtToken.value(),
                jwtCookieHttpPath,
                jwtCookieExpiration.intValue());
    }

    /**
     * Generate Cookie Removal
     *
     * @return {@link ResponseCookie}
     */
    public ResponseCookie generateCookieRemoval() {
        return generateCookie(
                jwtCookieName + jwtCookieNameSuffix,
                null,
                jwtCookieHttpPath);
    }

    /**
     * Generate Refresh Jwt Cookie
     *
     * @param refreshToken {@link JwtToken}
     * @return {@link ResponseCookie}
     */
    public ResponseCookie generateRefreshJwtCookie(final RefreshToken refreshToken) {
        final var refreshTokenUuid = refreshToken.getToken();
        return generateCookie(
                jwtCookieName + jwtRefreshCookieNameSuffix,
                refreshTokenUuid.toString(),
                jwtRefreshCookieHttpPath,
                jwtRefreshCookieExpiration.intValue());
    }

    /**
     * Generate Refresh Jwt Cookie Removal
     *
     * @return {@link ResponseCookie}
     */
    public ResponseCookie generateRefreshJwtCookieRemoval() {
        return generateCookie(
                jwtRefreshCookieName + jwtRefreshCookieNameSuffix,
                null,
                jwtRefreshCookieHttpPath);
    }

    /**
     * Get Jwt token from request if any
     *
     * @param request {@link HttpServletRequest}
     * @return {@link Optional} of {@link JwtToken}
     */
    public Optional<JwtToken> getJwtTokenFromRequest(final HttpServletRequest request) {
        return getCookieValueByName(
                request, "%s-jwt".formatted(jwtCookieName))
                .map(Cookie::getValue)
                .filter(cookieValue -> cookieValue != null && !cookieValue.isBlank())
                .map(JwtToken::of);
    }

    /**
     * Get Jwt refresh token uuid from request if any
     *
     * @param request {@link HttpServletRequest}
     * @return {@link Optional} of {@link UUID}
     */
    public Optional<UUID> getRefreshTokenUuidFromRequest(final HttpServletRequest request) {
        return getCookieValueByName(
                request, "%s-refresh".formatted(jwtCookieName))
                .map(Cookie::getValue)
                .filter(cookieValue -> cookieValue != null && !cookieValue.isBlank())
                .map(UUID::fromString);
    }

    private ResponseCookie generateCookie(
            String name,
            @Nullable String value,
            String path) {
        return generateCookie(name, null, path, 0);
    }

    private ResponseCookie generateCookie(
            String name,
            @Nullable String value,
            String path,
            Integer expirationInMinutes) {
        ResponseCookie cookie = ResponseCookie
                .from(name)
                .value(value)
                .path(path)
                .maxAge(expirationInMinutes * 60)
                .httpOnly(true)
                .build();
        return cookie;
    }

    private Optional<Cookie> getCookieValueByName(HttpServletRequest request, String name) {
        return Optional.ofNullable(WebUtils.getCookie(request, name));
    }
}
