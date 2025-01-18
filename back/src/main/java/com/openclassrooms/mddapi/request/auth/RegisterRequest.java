package com.openclassrooms.mddapi.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

//@formatter:off
public record RegisterRequest(

    @NotNull
    @NotEmpty
    @Email
    @Size(min = 4, max = 255)
    String email,

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 255)
    String username,

    @Pattern(message = "password should be at least 8 chars "
        + "long with mixed case, special and digits chars",
        regexp = "^.*"
            // At least 8 char long
            + "(?=.{8,})"
            // Contains letter char
            + "(?=.*\\p{L})"
            // Contains digit char
            + "(?=.*\\p{N})"
            // Contains mixed chars
            + "(?=.*(?=(?=\\p{Ll}+.*\\p{Lu})|(?=\\p{Lu}+.*\\p{Ll})))"
            // Contains special char
            + "(?=.*[\\p{Z}|\\p{S}|\\p{P}])"
            // Anything after
            + ".*$")
    @NotNull
    @NotEmpty
    @Size(min = 8, max = 255)
    String password

) {
}
