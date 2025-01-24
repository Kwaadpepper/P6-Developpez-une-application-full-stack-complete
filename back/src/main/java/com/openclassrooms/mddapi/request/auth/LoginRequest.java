package com.openclassrooms.mddapi.request.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

//@formatter:off
public record LoginRequest(

    @NotNull
    @NotEmpty
    String login,

    @NotNull
    @NotEmpty
    String password

) {
}
