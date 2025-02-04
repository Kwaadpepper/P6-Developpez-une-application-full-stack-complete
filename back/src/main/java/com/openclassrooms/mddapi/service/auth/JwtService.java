package com.openclassrooms.mddapi.service.auth;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
import com.openclassrooms.mddapi.valueobject.JwtToken;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.AeadAlgorithm;

@Service
public class JwtService {
  private final long jwtTokenExpiration;
  private final String jwtSecretKey;
  private final AeadAlgorithm signingAlgorithm;
  private final SecretKey jwtEncryptKey;

  public JwtService(final AppConfiguration appConfiguration) throws NoSuchAlgorithmException, InvalidKeySpecException {
    jwtTokenExpiration = appConfiguration.getJwtTokenExpiration();
    jwtSecretKey = appConfiguration.getJwtSecretKey();

    signingAlgorithm = Jwts.ENC.A256CBC_HS512;
    jwtEncryptKey = getPasswordBasedKey("AES", 512, jwtSecretKey);
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
        .decryptWith(jwtEncryptKey)
        .build()
        .parseEncryptedClaims(jwtToken.value())
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
    final var currentDate = new Date();
    final var expirationDate = new Date();
    expirationDate.setTime(currentDate.getTime() + jwtTokenExpiration * 60 * 1000);

    return Jwts.builder()
        .header()
        .type("JWT")
        .add(extraClaims)
        .and()
        .subject(apiToken.toString())
        .expiration(expirationDate)
        .encryptWith(jwtEncryptKey, signingAlgorithm)
        .issuedAt(currentDate)
        .compact();
  }

  /** Generate a key from a password using PBKDF2WithHmacSHA256 */
  private static SecretKey getPasswordBasedKey(String cipher, int keySize, String password)
      throws NoSuchAlgorithmException, InvalidKeySpecException {
    var salt = new byte[100];
    var random = new SecureRandom();
    random.nextBytes(salt);
    var pbeKeySpec = new PBEKeySpec(password.toCharArray(), salt, 1000, keySize);
    var pbeKey = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256").generateSecret(pbeKeySpec);
    return new SecretKeySpec(pbeKey.getEncoded(), cipher);
  }
}
