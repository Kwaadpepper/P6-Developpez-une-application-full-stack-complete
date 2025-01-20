package com.openclassrooms.mddapi.valueobject;

public record JwtToken(String value) {
    public static JwtToken of(String value) {
        return new JwtToken(value);
    }
}
