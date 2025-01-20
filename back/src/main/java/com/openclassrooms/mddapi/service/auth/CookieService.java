package com.openclassrooms.mddapi.service.auth;

import java.util.Optional;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
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
