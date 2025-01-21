package com.openclassrooms.mddapi.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.SimpleMessage;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.request.auth.LoginRequest;
import com.openclassrooms.mddapi.request.auth.RegisterRequest;
import com.openclassrooms.mddapi.service.auth.AuthenticationService;
import com.openclassrooms.mddapi.service.auth.SessionService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final SessionService sessionService;

    public AuthenticationController(
            final AuthenticationService authenticationService,
            final SessionService sessionService) {
        this.authenticationService = authenticationService;
        this.sessionService = sessionService;
    }

    /**
     * Login a user
     *
     * @param request {@link LoginRequest}
     * @return {@link JwtDto}
     * @throws BadCredentialsException If user creadentials are invalid.
     */
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleMessage> login(@Valid @RequestBody final LoginRequest request)
            throws BadCredentialsException {

        final var jwtCookieList = authenticationService.authenticate(request.login(), request.password());
        final var message = new SimpleMessage("Logged in!");
        final var response = ResponseEntity.ok();

        jwtCookieList.forEach(cookie -> response.header(HttpHeaders.SET_COOKIE, cookie.toString()));

        return response.body(message);
    }

    /**
     * Register a new user
     *
     * @param request {@link RegisterRequest}
     * @return {@link JwtDto}
     * @throws ValidationException If the user data is invalid.
     */
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleMessage> register(@Valid @RequestBody final RegisterRequest request)
            throws ValidationException {

        final var jwtCookieList = authenticationService.register(
                request.getUsername(),
                request.getEmail(),
                request.getPassword());
        final var message = new SimpleMessage("Registered !");
        final var response = ResponseEntity.ok();

        jwtCookieList.forEach(cookie -> response.header(HttpHeaders.SET_COOKIE, cookie.toString()));

        return response.body(message);
    }

    /**
     * Refresh the current session ussing requests refresh token
     *
     * @param request {@link HttpServletRequest}
     * @return {@link SimpleMessage}
     */
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshtoken(HttpServletRequest request) {

        final var jwtCookieList = sessionService.refreshSessionFromRequest(request);
        final var message = new SimpleMessage("Token is refreshed!");
        final var response = ResponseEntity.ok();

        jwtCookieList.forEach(cookie -> response.header(HttpHeaders.SET_COOKIE, cookie.toString()));

        return response.body(message);
    }

}
