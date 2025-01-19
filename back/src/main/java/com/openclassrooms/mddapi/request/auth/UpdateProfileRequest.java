package com.openclassrooms.mddapi.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//@formatter:off
public record UpdateProfileRequest(

    @NotNull
    @NotEmpty
    String name,

    @NotNull
    @NotEmpty
    @Email
    @Size(min = 4, max = 255)
    String email

) {
}