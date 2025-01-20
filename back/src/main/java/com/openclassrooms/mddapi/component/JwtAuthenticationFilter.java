package com.openclassrooms.mddapi.component;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.openclassrooms.mddapi.exception.exceptions.JwtAuthenticationFailureException;
import com.openclassrooms.mddapi.exception.exceptions.JwtExpiredException;
import com.openclassrooms.mddapi.service.auth.AuthenticationService;
import com.openclassrooms.mddapi.service.auth.CookieService;
import com.openclassrooms.mddapi.service.auth.JwtService;
import com.openclassrooms.mddapi.valueobject.JwtToken;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Check if an Authorization header is set and that it contains a valid JwtToken
 * and that it matches
 * an actual User.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
  private final AuthenticationService authenticationService;
  private final CookieService cookieService;
  private final JwtService jwtService;
  private final HandlerExceptionResolver exceptionResolver;
  private List<String> ignoreUrls;

  public JwtAuthenticationFilter(
      final AuthenticationService authenticationService,
      final CookieService cookieService,
      final JwtService jwtService,
      @Qualifier("handlerExceptionResolver") final HandlerExceptionResolver exceptionResolver) {
    this.authenticationService = authenticationService;
    this.cookieService = cookieService;
    this.jwtService = jwtService;
    this.exceptionResolver = exceptionResolver;
    this.ignoreUrls = new ArrayList<>();
  }

  public void setIgnoreUrls(List<String> ignoreUrls) {
    this.ignoreUrls = ignoreUrls;
  }

  @Override
  protected void doFilterInternal(final HttpServletRequest request,
      final HttpServletResponse response, final FilterChain filterChain)
      throws IOException, ServletException {
    try {
      final UserDetails userDetails;
      final var jwtToken = extractTokenFromCookie(request).orElse(null);

      if (jwtToken == null || !urlHasToBeFiltered(request)) {
        logger.debug("Request does not have 'Authorize' header, skipping authentication.");
        filterChain.doFilter(request, response);
        return;
      }

      if (checkIfTokenIsExpired(jwtToken)) {
        logger.debug("JwtToken is expired");
        throw new JwtExpiredException();
      }

      userDetails = getUserDetailsFromJwtToken(jwtToken).orElseThrow(() -> {
        logger.debug("No user with the provided JwtToken");
        throw new JwtAuthenticationFailureException("JwtToken does not match any user");
      });

      logger
          .debug("User authenticated via JwtTokenFilter '%s'".formatted(userDetails.getUsername()));

      /**
       * Set a security context so user is authenticated on controllers and beyond
       */
      final var securityContext = getNewSecurityContext(request, userDetails, jwtToken);
      SecurityContextHolder.setContext(securityContext);

      // Pursue the filter chain.
      filterChain.doFilter(request, response);
    } catch (final Exception e) {
      // Dispatch the exception to our Global handler.
      exceptionResolver.resolveException(request, response, null, e);
    }
  }

  private boolean urlHasToBeFiltered(final HttpServletRequest request) {
    try {
      var url = URI.create(request.getRequestURI());
      return ignoreUrls.stream()
          .filter(ignoreUrl -> url.getPath().startsWith(ignoreUrl))
          .count() == 0;
    } catch (NullPointerException e) {
      return false;
    } catch (IllegalArgumentException e) {
      return false;
    }
  }

  /**
   * Verify if a jwt token is expired
   *
   * @param jwtToken {@link JwtToken}
   * @return {@literal boolean}
   */
  private boolean checkIfTokenIsExpired(final JwtToken jwtToken) {
    try {
      return jwtService.hasTokenExpired(jwtToken);
    } catch (final JwtException e) {
      logger.debug(e.getMessage(), e);
      return false;
    }
  }

  /**
   * Extract Jwt Token from request
   *
   * @param request {@link HttpServletRequest}
   * @return {@link Optional} of {@link JwtToken}
   */
  private Optional<JwtToken> extractTokenFromCookie(final HttpServletRequest request) {
    return cookieService.getJwtTokenFromRequest(request);
  }

  /**
   * Get api token from Jwt token
   *
   * @param jwtToken {@link JwtToken}
   * @return {@link Optional} of {@link UUID}
   */
  private Optional<UUID> getApiTokenFromJwtToken(final JwtToken jwtToken) throws JwtException {
    try {
      final var potentialJwtToken = jwtService.extractApiToken(jwtToken);
      return Optional.of(UUID.fromString(potentialJwtToken));
    } catch (final IllegalArgumentException e) {
      return Optional.empty();
    }
  }

  /**
   * Get security context from request
   *
   * @param request     {@link HttpServletRequest}
   * @param userDetails {@link UserDetails}
   * @param jwtToken    {@link JwtToken}
   * @return {@link SecurityContext}
   */
  private SecurityContext getNewSecurityContext(
      final HttpServletRequest request,
      final UserDetails userDetails,
      final JwtToken jwtToken) {
    final var context = SecurityContextHolder.createEmptyContext();
    final var authToken = new UsernamePasswordAuthenticationToken(userDetails, jwtToken,
        userDetails.getAuthorities());
    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
    context.setAuthentication(authToken);
    return context;
  }

  /**
   * Get user details from Jwt token
   *
   * @param jwtToken {@link JwtToken}
   * @return {@link Optional} of {@link UserDetails}
   */
  private Optional<UserDetails> getUserDetailsFromJwtToken(final JwtToken jwtToken) {
    try {
      final var userApiToken = getApiTokenFromJwtToken(jwtToken)
          .orElseThrow(() -> new UsernameNotFoundException("Api token is not valid"));
      final var user = authenticationService.authenticate(userApiToken);
      return Optional.of(user);
    } catch (final BadCredentialsException e) {
      logger.debug("Wrong api token provided in the jwt token");
      return Optional.empty();
    } catch (final JwtException e) {
      logger
          .debug("Failed to get ApiToken from the JwtToken reason '%s'".formatted(e.getMessage()));
      return Optional.empty();
    }
  }
}
