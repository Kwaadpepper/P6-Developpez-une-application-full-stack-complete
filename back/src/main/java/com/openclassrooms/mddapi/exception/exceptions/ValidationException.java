package com.openclassrooms.mddapi.exception.exceptions;

import com.openclassrooms.mddapi.configuration.AppConfiguration;

public class ValidationException extends RuntimeException {
  private static final long serialVersionUID = AppConfiguration.SERIAL_VERSION_UID;

  public ValidationException(final String message) {
    super(message);
  }

  public ValidationException(final String message, final Throwable previous) {
    super(message, previous);
  }
}
