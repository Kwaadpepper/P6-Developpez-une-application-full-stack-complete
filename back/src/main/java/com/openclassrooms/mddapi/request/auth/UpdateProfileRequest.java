package com.openclassrooms.mddapi.request.auth;

import com.openclassrooms.mddapi.valueobject.Email;

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
    @Size(min = 4, max = 255)
    String email

) {
    public String getName() {
        return name;
    }

    public Email getEmail() {
        return Email.of(email);
    }
}