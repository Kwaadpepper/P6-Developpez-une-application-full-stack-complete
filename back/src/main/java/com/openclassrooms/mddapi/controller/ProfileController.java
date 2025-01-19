package com.openclassrooms.mddapi.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.SimpleMessage;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.presenter.UserPresenter;
import com.openclassrooms.mddapi.request.auth.UpdateProfileRequest;
import com.openclassrooms.mddapi.service.auth.AuthenticationService;
import com.openclassrooms.mddapi.service.models.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final UserPresenter userPresenter;

    public ProfileController(
            final AuthenticationService authenticationService,
            final UserService userService,
            final UserPresenter userPresenter) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.userPresenter = userPresenter;
    }

    /**
     * Get the authenticated user details
     *
     * @return {@link UserDto}
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public UserDto getAuthenticatedUserDetails() {
        final var user = getAuthenticatedUser();

        return userPresenter.present(user);
    }

    /**
     * Update the authenticated user details
     *
     * @param request {@link UpdateProfileRequest}
     * @return {@link SimpleMessage}
     */
    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleMessage setAuthenticatedUserDetails(@RequestBody @Valid final UpdateProfileRequest request) {
        final var user = getAuthenticatedUser();

        userService.updateUser(
                user.getUuid(),
                request.name(),
                request.email());

        userPresenter.present(user);

        return new SimpleMessage("Profile updated!");
    }

    private User getAuthenticatedUser() {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        return authenticationService.toUser(authentication);
    }

}
