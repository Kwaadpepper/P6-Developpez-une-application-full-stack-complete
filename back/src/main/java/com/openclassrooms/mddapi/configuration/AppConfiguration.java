package com.openclassrooms.mddapi.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.Nullable;

/** Hold our application configuration */
@Configuration
public class AppConfiguration {
  public static final long SERIAL_VERSION_UID = 1L;

  /** Expiration in minutes */
  private static final Integer MIN_JWT_EXPIRATION = 1;

  private final String allowedOrigins;
  private final String jwtSigningSecretKey;
  private final String jwtCookieName;
  private final Integer jwtTokenExpiration;
  private final Integer jwtRefreshExpiration;

  AppConfiguration(
      @Value("${server.cors.allowed-origins}") final String allowedOrigins,
      @Value("${jwt.signing.secret_key}") final String jwtSigningSecretKey,
      @Value("${jwt.cookie.name}") final String jwtCookieName,
      @Value("${jwt.token.expiration}") final Integer jwtTokenExpiration,
      @Value("${jwt.refresh.expiration}") final Integer jwtRefreshExpiration) {

    assertNotEmpty(allowedOrigins, "server.cors.allowed-origins");
    assertNotEmpty(jwtSigningSecretKey, "jwt.signing.secret_key");
    assertNotEmpty(jwtCookieName, "jwt.cookie.name");

    if (jwtTokenExpiration == null || jwtTokenExpiration < MIN_JWT_EXPIRATION) {
      throw new IllegalStateException(
          "Property 'jwt.token.expiration' must be greater or equals to %d".formatted(MIN_JWT_EXPIRATION));
    }

    if (jwtRefreshExpiration == null || jwtRefreshExpiration < MIN_JWT_EXPIRATION) {
      throw new IllegalStateException(
          "Property 'jwt.refresh.expiration' must be greater or equals to %d".formatted(MIN_JWT_EXPIRATION));
    }

    if (jwtRefreshExpiration <= jwtTokenExpiration) {
      throw new IllegalStateException(
          "Property 'jwt.refresh.expiration' must be greater than 'jwt.token.expiration'");
    }

    this.allowedOrigins = allowedOrigins;
    this.jwtSigningSecretKey = jwtSigningSecretKey;
    this.jwtCookieName = jwtCookieName;
    this.jwtTokenExpiration = jwtTokenExpiration;
    this.jwtRefreshExpiration = jwtRefreshExpiration;
  }

  public String getAllowedOrigins() {
    return allowedOrigins;
  }

  public String getJwtSigningSecretKey() {
    return jwtSigningSecretKey;
  }

  public String getJwtCookieName() {
    return jwtCookieName;
  }

  public Integer getJwtTokenExpiration() {
    return jwtTokenExpiration;
  }

  public Integer getJwtRefreshExpiration() {
    return jwtRefreshExpiration;
  }

  private void assertNotEmpty(@Nullable String value, String property) {
    if (value == null || value.isBlank()) {
      throw new IllegalStateException("Property '%s' cannot be null or empty".formatted(property));
    }
  }
}
