package com.openclassrooms.mddapi.request.auth;

import com.openclassrooms.mddapi.request.Request;
import com.openclassrooms.mddapi.valueobject.Email;
import com.openclassrooms.mddapi.valueobject.Password;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    @NotEmpty
    @Size(max = 255)
    String password

) {

    public Email getEmail() {
        return Request.validate("email", email,
            email -> Email.of(email));
    }

    public String getUsername() {
        return username;
    }

    public Password getPassword() {
        return Request.validate("password", password,
            password -> Password.of(password));
    }
}
