package com.openclassrooms.mddapi.valueobject;

public record JwtToken(String value) {

    public JwtToken {
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("JwtToken value must not be empty.");
        }
    }

    public static JwtToken of(String value) {
        return new JwtToken(value);
    }
}
