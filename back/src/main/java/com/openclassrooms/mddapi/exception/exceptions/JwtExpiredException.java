package com.openclassrooms.mddapi.exception.exceptions;

import org.springframework.security.core.AuthenticationException;

import com.openclassrooms.mddapi.configuration.AppConfiguration;

public class JwtExpiredException extends AuthenticationException {
  private static final long serialVersionUID = AppConfiguration.SERIAL_VERSION_UID;

  public JwtExpiredException() {
    super("JWT token is exired");
  }
}
