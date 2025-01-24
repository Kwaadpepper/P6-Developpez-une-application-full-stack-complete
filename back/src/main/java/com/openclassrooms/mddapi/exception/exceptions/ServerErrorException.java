package com.openclassrooms.mddapi.exception.exceptions;

import com.openclassrooms.mddapi.configuration.AppConfiguration;

public class ServerErrorException extends RuntimeException {
  private static final long serialVersionUID = AppConfiguration.SERIAL_VERSION_UID;

  public ServerErrorException(final String message) {
    super(message);
  }

  public ServerErrorException(final String message, final Throwable previous) {
    super(message, previous);
  }
}
