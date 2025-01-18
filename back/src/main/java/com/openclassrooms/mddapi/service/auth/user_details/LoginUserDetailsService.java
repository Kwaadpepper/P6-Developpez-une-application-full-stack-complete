package com.openclassrooms.mddapi.service.auth.user_details;

import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.openclassrooms.mddapi.repository.CredentialRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

public class LoginUserDetailsService implements UserDetailsService {
  private static final Logger logger = LogManager.getLogger(LoginUserDetailsService.class);
  private final UserRepository userRepository;
  private final CredentialRepository credentialRepository;

  public LoginUserDetailsService(
      final UserRepository userRepository,
      final CredentialRepository credentialRepository) {
    this.userRepository = userRepository;
    this.credentialRepository = credentialRepository;
  }

  @Override
  public UserDetails loadUserByUsername(@SuppressWarnings("null") final String userEmailOrName)
      throws UsernameNotFoundException {
    final var notFoundMessage = "Wrong username";
    try {
      return userDetailsByEmail(userEmailOrName)
          .orElseGet(() -> userDetailsByName(userEmailOrName)
              .orElseThrow(IllegalArgumentException::new));
    } catch (final IllegalArgumentException e) {
      logger.debug(notFoundMessage);
      throw new UsernameNotFoundException(notFoundMessage);
    }
  }

  private Optional<UserDetails> userDetailsByEmail(final String email) {
    return userRepository.findByEmail(email).map(user -> {
      return credentialRepository.findByUserUuid(user.getUuid()).orElseThrow(() -> {
        throw new IllegalStateException("Every user has to have credentials, DB is in invalid state.");
      });
    });
  }

  private Optional<UserDetails> userDetailsByName(final String name) {
    return userRepository.findByName(name).map(user -> {
      return credentialRepository.findByUserUuid(user.getUuid()).orElseThrow(() -> {
        throw new IllegalStateException("Every user has to have credentials, DB is in invalid state.");
      });
    });
  }
}
