package com.openclassrooms.mddapi.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.JwtDto;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.presenter.UserPresenter;
import com.openclassrooms.mddapi.request.auth.LoginRequest;
import com.openclassrooms.mddapi.request.auth.RegisterRequest;
import com.openclassrooms.mddapi.service.auth.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final UserPresenter userPresenter;

    public AuthenticationController(final AuthenticationService authenticationService,
            final UserPresenter userPresenter) {
        this.authenticationService = authenticationService;
        this.userPresenter = userPresenter;
    }

    /**
     * Get the authenticated user details
     *
     * @return {@link UserDto}
     */
    @GetMapping(value = "/me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserDto> getAuthenticatedUserDetails() {
        final var user = getAuthenticatedUser();

        return ResponseEntity.ok().body(userPresenter.present(user));
    }

    /**
     * Login a user
     *
     * @param request {@link LoginRequest}
     * @return {@link JwtDto}
     * @throws BadCredentialsException If user creadentials are invalid.
     */
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JwtDto> login(@Valid @RequestBody final LoginRequest request)
            throws BadCredentialsException {

        final var jwtDto = authenticationService.authenticate(request.login(), request.password());

        return ResponseEntity.ok(jwtDto);
    }

    /**
     * Register a new user
     *
     * @param request {@link RegisterRequest}
     * @return {@link JwtDto}
     * @throws ValidationException If the user data is invalid.
     */
    @Transactional
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<JwtDto> register(@Valid @RequestBody final RegisterRequest request)
            throws ValidationException {

        final var jwtDto = authenticationService.register(
                request.username(),
                request.email(),
                request.password());

        return ResponseEntity.ok(jwtDto);
    }

    private User getAuthenticatedUser() {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        return authenticationService.toUser(authentication);
    }

}
