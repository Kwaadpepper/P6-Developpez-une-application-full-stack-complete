package com.openclassrooms.mddapi.valueobject;

import jakarta.persistence.Embeddable;

@Embeddable
public record PasswordHash(String value) {

    @SuppressWarnings("ConstantConditions")
    public PasswordHash {
        if (value == null || value.isBlank()) {
            throw new IllegalStateException("Password hash value cannot be blank");
        }
        if (!value.matches(containsHashedValue())) {
            throw new IllegalStateException(
                    "Password hash value may look like $...$...$... and be a hash");
        }
    }

    public static PasswordHash of(String value) throws IllegalStateException {
        return new PasswordHash(value);
    }

    public String getValue() {
        return value();
    }

    private String containsHashedValue() {
        return "^\\$.+\\$.+\\$.+\\$?";
    }
}
