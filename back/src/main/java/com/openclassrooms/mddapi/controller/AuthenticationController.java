package com.openclassrooms.mddapi.controller;

import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.JwtDto;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.request.auth.LoginRequest;
import com.openclassrooms.mddapi.request.auth.RegisterRequest;
import com.openclassrooms.mddapi.service.auth.AuthenticationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(
            final AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Login a user
     *
     * @param request {@link LoginRequest}
     * @return {@link JwtDto}
     * @throws BadCredentialsException If user creadentials are invalid.
     */
    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public JwtDto login(@Valid @RequestBody final LoginRequest request)
            throws BadCredentialsException {

        return authenticationService.authenticate(request.login(), request.password());
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
    public JwtDto register(@Valid @RequestBody final RegisterRequest request)
            throws ValidationException {

        return authenticationService.register(
                request.username(),
                request.email(),
                request.password());
    }

}
