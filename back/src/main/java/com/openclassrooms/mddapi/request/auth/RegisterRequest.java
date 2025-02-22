package com.openclassrooms.mddapi.request.auth;

import org.jsoup.Jsoup;

import com.openclassrooms.mddapi.request.Request;
import com.openclassrooms.mddapi.valueobject.Email;
import com.openclassrooms.mddapi.valueobject.Password;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 255)
    private final String email;

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 255)
    private final String username;

    @NotNull
    @NotEmpty
    @Size(max = 255)
    private final String password;

    public RegisterRequest(
            String email,
            String username,
            String password) {
        this.email = email;
        this.username = username;
        this.password = password;
    }

    public Email getEmail() {
        return Request.validate("email", email,
                email -> Email.of(email));
    }

    public String getUsername() {
        return Jsoup.parse(username).text();
    }

    public Password getPassword() {
        return Request.validate("password", password,
                password -> Password.of(password));
    }
}
