package com.openclassrooms.mddapi.controller;

import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dto.SimpleMessage;
import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.presenter.UserPresenter;
import com.openclassrooms.mddapi.request.auth.UpdateProfileRequest;
import com.openclassrooms.mddapi.service.auth.SessionService;
import com.openclassrooms.mddapi.service.models.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final SessionService sessionService;
    private final UserService userService;
    private final UserPresenter userPresenter;

    public ProfileController(
            final SessionService sessionService,
            final UserService userService,
            final UserPresenter userPresenter) {
        this.sessionService = sessionService;
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
        final var authUser = sessionService.getAuthenticatedUser();

        return userPresenter.present(authUser);
    }

    /**
     * Update the authenticated user details
     *
     * @param request {@link UpdateProfileRequest}
     * @return {@link SimpleMessage}
     */
    @Transactional
    @PutMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public SimpleMessage setAuthenticatedUserDetails(@RequestBody @Valid final UpdateProfileRequest request) {
        final var authUser = sessionService.getAuthenticatedUser();

        userService.updateUser(
                authUser.getUuid(),
                request.getName(),
                request.getEmail());

        userPresenter.present(authUser);

        return new SimpleMessage("Profile updated!");
    }

}
