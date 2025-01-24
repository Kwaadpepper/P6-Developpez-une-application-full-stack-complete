package com.openclassrooms.mddapi.service.auth.user_details;

import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.openclassrooms.mddapi.repository.CredentialRepository;

public class ApiUserDetailsService implements UserDetailsService {
  private static final Logger logger = LogManager.getLogger(ApiUserDetailsService.class);
  private final CredentialRepository credentialRepository;

  public ApiUserDetailsService(
      final CredentialRepository credentialRepository) {
    this.credentialRepository = credentialRepository;
  }

  @Override
  public UserDetails loadUserByUsername(@SuppressWarnings("null") String apiToken) throws UsernameNotFoundException {
    final var notFoundMessage = "Wrong api token '%s'".formatted(apiToken);
    try {
      var credential = credentialRepository.findByApiToken(UUID.fromString(apiToken)).orElseThrow(() -> {
        logger.debug(notFoundMessage);
        throw new UsernameNotFoundException(notFoundMessage);
      });
      return credential;
    } catch (final IllegalArgumentException e) {
      logger.debug(notFoundMessage);
      throw new UsernameNotFoundException(notFoundMessage);
    }
  }
}
