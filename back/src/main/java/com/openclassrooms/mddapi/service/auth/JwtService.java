package com.openclassrooms.mddapi.service.auth;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
import com.openclassrooms.mddapi.valueobject.JwtToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
  private final AppConfiguration appConfiguration;

  public JwtService(
      final AppConfiguration appConfiguration) {
    this.appConfiguration = appConfiguration;
  }

  /** Extract the apiToken from a JwtToken that was set in the subject claim. */
  public String extractApiToken(final JwtToken jwtToken) throws JwtException {
    return extractClaim(jwtToken, Claims::getSubject);
  }

  /** Generate a JwtToken with an apiToken in the subject claim. */
  public JwtToken generateToken(final UUID apiToken) {
    final var token = generateToken(Map.of(), apiToken);
    return JwtToken.of(token);
  }

  /** Check if a JwtToken is expired. */
  public boolean hasTokenExpired(final JwtToken jwtToken) throws JwtException {
    try {
      final var expirationDate = extractExpiration(jwtToken);
      return expirationDate.before(new Date());
    } catch (final ExpiredJwtException e) {
      return true;
    }
  }

  /** Attempt to extract the pay load from JWT token. */
  private Claims extractAllClaims(final JwtToken jwtToken) throws JwtException {
    return Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(jwtToken.value())
        .getPayload();
  }

  /** Get a claim value form the token using a resolve */
  private <T> T extractClaim(final JwtToken jwtToken, final Function<Claims, T> claimsResolver)
      throws JwtException {
    final var claims = extractAllClaims(jwtToken);
    return claimsResolver.apply(claims);
  }

  /** Get expiration date from the token. */
  private Date extractExpiration(final JwtToken jwtToken) throws JwtException {
    return extractClaim(jwtToken, Claims::getExpiration);
  }

  /** Generate and sign the actual JWT token. */
  private String generateToken(final Map<String, Object> extraClaims, final UUID apiToken) {
    final var jwtTokenExpirationMs = appConfiguration.jwtTokenExpirationMs;

    return Jwts.builder()
        .header()
        .type("JWT")
        .add(extraClaims)
        .and()
        .subject(apiToken.toString())
        .expiration(new Date(System.currentTimeMillis() + jwtTokenExpirationMs))
        .signWith(getSigningKey())
        .issuedAt(new Date(System.currentTimeMillis()))
        .compact();
  }

  /** Get signing key from configuration. */
  private SecretKey getSigningKey() {
    final var jwtSigningSecretKey = appConfiguration.jwtSigningSecretKey;
    final var keyBytes = jwtSigningSecretKey.getBytes(StandardCharsets.UTF_8);

    return Keys.hmacShaKeyFor(keyBytes);
  }
}
