package com.openclassrooms.mddapi.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/** Hold our application configuration */
@Configuration
public class AppConfiguration {
  public static final long SERIAL_VERSION_UID = 1L;

  @Value("${server.cors.allowed-origins}")
  public String allowedOrigins;

  @Value("${jwt.signing.secret_key}")
  public String jwtSigningSecretKey;

  @Value("${jwt.cookie.name}")
  public String jwtCookieName;

  @Value("${jwt.token.expiration}")
  public Long jwtTokenExpirationMs;

  @Value("${jwt.refresh.expiration}")
  public Long jwtRefreshExpirationMs;
}
