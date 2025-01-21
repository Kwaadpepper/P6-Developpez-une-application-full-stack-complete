package com.openclassrooms.mddapi.service.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
import com.openclassrooms.mddapi.model.RefreshToken;
import com.openclassrooms.mddapi.valueobject.JwtToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class CookieService {
    private final AppConfiguration appConfiguration;

    CookieService(
            final AppConfiguration appConfiguration) {
        this.appConfiguration = appConfiguration;
    }

    /**
     * Generate Jwt Cookie
     *
     * @param jwtToken {@link JwtToken}
     * @return {@link ResponseCookie}
     */
    public ResponseCookie generateJwtCookie(final JwtToken jwtToken) {
        final var jwtCookieName = appConfiguration.jwtCookieName;
        return generateCookie(jwtCookieName + "-jwt", jwtToken.value(), "/api");
    }

    /**
     * Generate Refresh Jwt Cookie
     *
     * @param refreshToken {@link JwtToken}
     * @return {@link ResponseCookie}
     */
    public ResponseCookie generateRefreshJwtCookie(final RefreshToken refreshToken) {
        final var jwtRefreshCookieName = appConfiguration.jwtCookieName;
        final var refreshTokenUuid = refreshToken.getRefreshToken();
        return generateCookie(
                jwtRefreshCookieName + "-refresh",
                refreshTokenUuid.toString(),
                "/api/auth/refresh-token");
    }

    /**
     * Get Jwt token from request if any
     *
     * @param request {@link HttpServletRequest}
     * @return {@link Optional} of {@link JwtToken}
     */
    public Optional<JwtToken> getJwtTokenFromRequest(final HttpServletRequest request) {
        return getCookieValueByName(
                request, appConfiguration.jwtCookieName + "-jwt")
                .map(Cookie::getValue)
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
                request, appConfiguration.jwtCookieName + "-refresh")
                .map(Cookie::getValue)
                .map(UUID::fromString);
    }

    private ResponseCookie generateCookie(String name, String value, String path) {
        ResponseCookie cookie = ResponseCookie
                .from(name, value)
                .path(path)
                .maxAge(24 * 60 * 60)
                .httpOnly(true)
                .build();
        return cookie;
    }

    private Optional<Cookie> getCookieValueByName(HttpServletRequest request, String name) {
        return Optional.ofNullable(WebUtils.getCookie(request, name));
    }
}
