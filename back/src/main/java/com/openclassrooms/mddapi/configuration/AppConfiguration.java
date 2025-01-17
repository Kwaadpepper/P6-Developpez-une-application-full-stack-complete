package com.openclassrooms.mddapi.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/** Hold our application configuration */
@Configuration
public class AppConfiguration {
  public static final long SERIAL_VERSION_UID = 1L;

  @Value("${jwt.signing.secret_key}")
  public String jwtSigningSecretKey;
}
