package com.openclassrooms.mddapi.valueobject;

import java.util.regex.Pattern;

import jakarta.persistence.Embeddable;

@Embeddable
public record Slug(String value) {

    @SuppressWarnings("ConstantConditions")
    public Slug {
        if (!isValidSlug(value)) {
            throw new IllegalStateException("Invalid slug value '%s'".formatted(value));
        }
    }

    public static Slug of(String value) throws IllegalStateException {
        return new Slug(value);
    }

    public static boolean isValidSlug(String value) {
        if (value.isBlank()) {
            return false;
        }
        var slugPattern = Pattern.compile("^[a-z0-9-]+$");
        return slugPattern.matcher(value).matches();
    }
}
