package com.openclassrooms.mddapi.request.auth;

import java.util.Objects;

import com.openclassrooms.mddapi.request.Request;
import com.openclassrooms.mddapi.valueobject.Email;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

//@formatter:off
public record RegisterRequest(

    @NotNull
    @NotEmpty
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

    public Email getEmail() {
        return Objects.requireNonNull(Request.validate("email", email,
        email -> email != null ? Email.of(email.trim()) : null));

    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
