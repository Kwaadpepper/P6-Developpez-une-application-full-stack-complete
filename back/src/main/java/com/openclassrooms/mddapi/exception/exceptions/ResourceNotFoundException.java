package com.openclassrooms.mddapi.exception.exceptions;

import com.openclassrooms.mddapi.configuration.AppConfiguration;

public class ResourceNotFoundException extends RuntimeException {
  private static final long serialVersionUID = AppConfiguration.SERIAL_VERSION_UID;

  public ResourceNotFoundException(final String message) {
    super(message);
  }

  public ResourceNotFoundException(final String message, final Throwable previous) {
    super(message, previous);
  }
}
