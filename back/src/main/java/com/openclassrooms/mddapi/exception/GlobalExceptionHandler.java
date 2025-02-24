package com.openclassrooms.mddapi.exception;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.HandlerMethodValidationException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.openclassrooms.mddapi.dto.ApiErrorDetails;
import com.openclassrooms.mddapi.dto.ValidationErrorDetails;
import com.openclassrooms.mddapi.exception.exceptions.JwtAuthenticationFailureException;
import com.openclassrooms.mddapi.exception.exceptions.JwtExpiredException;
import com.openclassrooms.mddapi.exception.exceptions.RefreshExpiredException;
import com.openclassrooms.mddapi.exception.exceptions.ResourceNotFoundException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ApiErrorDetails> handleException(final BadCredentialsException ex,
      final WebRequest request) {
    return new ResponseEntity<>(toErrorDetails("Bad credentials", request),
        HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(JwtAuthenticationFailureException.class)
  public ResponseEntity<ApiErrorDetails> handleException(final JwtAuthenticationFailureException ex,
      final WebRequest request) {
    return new ResponseEntity<>(toErrorDetails(ex, request), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(JwtExpiredException.class)
  public ResponseEntity<ApiErrorDetails> handleException(final JwtExpiredException ex,
      final WebRequest request) {
    return new ResponseEntity<>(toErrorDetails(ex, request), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(RefreshExpiredException.class)
  public ResponseEntity<ApiErrorDetails> handleException(final RefreshExpiredException ex,
      final WebRequest request) {
    return new ResponseEntity<>(toErrorDetails(ex, request), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  public ResponseEntity<ApiErrorDetails> handleException(final ResourceNotFoundException ex,
      final WebRequest request) {
    return new ResponseEntity<>(toErrorDetails(ex, request), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<ApiErrorDetails> handleException(final Throwable ex,
      final WebRequest request) {
    logger.fatal("Error : '%s' on uri '%s'".formatted(ex.getMessage(), getRequestUri(request)), ex);
    return new ResponseEntity<>(toErrorDetails("Server error", request),
        HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(UsernameNotFoundException.class)
  public ResponseEntity<ApiErrorDetails> handleException(final UsernameNotFoundException ex,
      final WebRequest request) {
    return new ResponseEntity<>(toErrorDetails(ex, request), HttpStatus.UNAUTHORIZED);
  }

  @ExceptionHandler(ValidationException.class)
  public ResponseEntity<ValidationErrorDetails> handleException(final ValidationException ex,
      final WebRequest request) {

    final Map<String, String> errors = new HashMap<>();
    ex.getErrors().forEach(error -> {
      final var fieldName = error.field();
      final var errorMessage = error.message();
      errors.put(fieldName, errorMessage);
    });

    return new ResponseEntity<>(
        toValidationErrorDetails("Some fields could not be validated", errors, request),
        HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Override
  @Nullable
  protected ResponseEntity<Object> handleHandlerMethodValidationException(
      final HandlerMethodValidationException ex, final HttpHeaders headers,
      final HttpStatusCode status, final WebRequest request) {

    final Map<String, String> errors = new HashMap<>();
    ex.getParameterValidationResults().forEach(error -> {
      final var parameterName = error.getMethodParameter().getParameterName();
      final var fieldName = toSnakeCase(parameterName != null ? parameterName : "unknown");
      final var errorMessage = error.getResolvableErrors().stream()
          .map(MessageSourceResolvable::getDefaultMessage).toList().toString();
      errors.put(fieldName, errorMessage);
    });

    return new ResponseEntity<>(
        toValidationErrorDetails("Some fields could not be validated", errors, request),
        HttpStatus.UNPROCESSABLE_ENTITY);
  }

  @Nullable
  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      final MethodArgumentNotValidException ex, final HttpHeaders headers,
      final HttpStatusCode status, final WebRequest request) {

    final Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach(error -> {
      final var fieldName = toSnakeCase(((FieldError) error).getField());
      final var errorMessage = error.getDefaultMessage();
      errors.put(fieldName, errorMessage);
    });

    return new ResponseEntity<>(
        toValidationErrorDetails("Some fields could not be validated", errors, request),
        HttpStatus.UNPROCESSABLE_ENTITY);
  }

  private String getRequestUri(final WebRequest request) {
    return ((ServletWebRequest) request).getRequest().getRequestURI();
  }

  private ApiErrorDetails toErrorDetails(final String message, final WebRequest request) {
    return new ApiErrorDetails(new Date(), message, getRequestUri(request));
  }

  private ApiErrorDetails toErrorDetails(final Throwable e, final WebRequest request) {
    return new ApiErrorDetails(new Date(), e.getMessage(), getRequestUri(request));
  }

  private String toSnakeCase(final String value) {
    return value.replaceAll("(.)(\\p{Upper}+|\\d+)", "$1_$2").toLowerCase();
  }

  private ValidationErrorDetails toValidationErrorDetails(final String message,
      final Map<String, String> errors, final WebRequest request) {
    return new ValidationErrorDetails(new Date(), message, errors, getRequestUri(request));
  }

}
