package com.openclassrooms.mddapi.exception.exceptions;

import org.springframework.security.core.AuthenticationException;

import com.openclassrooms.mddapi.configuration.AppConfiguration;

public class JwtAuthenticationFailureException extends AuthenticationException {
  private static final long serialVersionUID = AppConfiguration.SERIAL_VERSION_UID;

  public JwtAuthenticationFailureException(final String message) {
    super(message);
  }

  public JwtAuthenticationFailureException(final String message, final Exception previous) {
    super(message, previous);
  }
}
