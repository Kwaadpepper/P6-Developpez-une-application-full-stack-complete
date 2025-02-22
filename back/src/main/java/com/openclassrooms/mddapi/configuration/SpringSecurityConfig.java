package com.openclassrooms.mddapi.configuration;

import java.util.List;
import java.util.function.Function;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.openclassrooms.mddapi.component.JwtAuthenticationFilter;
import com.openclassrooms.mddapi.provider.auth.ApiAuthenticationProvider;
import com.openclassrooms.mddapi.repository.CredentialRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.service.auth.user_details.ApiUserDetailsService;
import com.openclassrooms.mddapi.service.auth.user_details.LoginUserDetailsService;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

  /** User Argon2 instead of BCrypt. */
  @Bean
  PasswordEncoder passwordEncoder() {
    return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
  }

  /**
   * Configure Spring Security to disable Web pages features and protect all
   * routes using JWT
   * Filter.
   */
  @Bean
  SecurityFilterChain securityFilterChain(
      final HttpSecurity http,
      final JwtAuthenticationFilter jwtAuthenticationFilter) throws Exception {

    final var allowNonAuthRequestToUrls = new String[] {
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/refresh-token"
    };
    jwtAuthenticationFilter.setIgnoreUrls(List.of(allowNonAuthRequestToUrls));

    return http
        .csrf(csrf -> csrf.disable())
        .cors(Customizer.withDefaults())
        .exceptionHandling(handling -> handling
            .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
        .authorizeHttpRequests(request -> {
          // Login and Register are not protected.
          request.requestMatchers(allowNonAuthRequestToUrls).permitAll();

          // Any other routes are.
          request.anyRequest().fullyAuthenticated();
        })
        // No cookie session, just state less API.
        .sessionManagement(
            manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // Filter requests to check JWT and assert it matches an actual user.
        .addFilterAt(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class).build();
  }

  /**
   * Create an authentication manager with login,password and jwt login providers
   */
  @Bean
  AuthenticationManager usersAuthenticationManager(
      final HttpSecurity http,
      final AuthenticationConfiguration config,
      final UserRepository userRepository,
      final CredentialRepository credentialRepository)
      throws Exception {

    final var authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);

    // UserDetailsServices to Provider wrappers
    final Function<UserDetailsService, DaoAuthenticationProvider> toDaoAuthProvider = (
        final var userDetailsService) -> {
      final var daoAuthProvider = new DaoAuthenticationProvider();
      daoAuthProvider.setUserDetailsService(userDetailsService);
      daoAuthProvider.setPasswordEncoder(passwordEncoder());
      return daoAuthProvider;
    };
    final Function<ApiUserDetailsService, ApiAuthenticationProvider> toApiAuthProvider = ApiAuthenticationProvider::new;

    // Add User login provider to the manager
    authenticationManagerBuilder
        .authenticationProvider(
            toDaoAuthProvider.apply(new LoginUserDetailsService(userRepository, credentialRepository)));

    // Add Jwt login provider to the manager
    authenticationManagerBuilder
        .authenticationProvider(
            toApiAuthProvider.apply(new ApiUserDetailsService(credentialRepository)));

    authenticationManagerBuilder.parentAuthenticationManager(null);

    return authenticationManagerBuilder.build();
  }
}
