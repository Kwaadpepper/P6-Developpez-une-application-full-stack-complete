package com.openclassrooms.mddapi.service;

import org.springframework.stereotype.Service;

import com.github.slugify.Slugify;

@Service
public class SluggerService {
    private final Slugify slugify;

    SluggerService() {
        this.slugify = Slugify.builder()
                .underscoreSeparator(false)
                .customReplacement("_", "-")
                .transliterator(true)
                .build();

    }

    public String slugify(final String value) throws IllegalArgumentException {
        String sluggedValue;

        if (value.isBlank()) {
            throw new IllegalArgumentException("Value cannot be empty");
        }

        sluggedValue = slugify.slugify(value);

        if (sluggedValue.isBlank()) {
            throw new IllegalArgumentException("Slugged value cannot be empty");
        }

        return sluggedValue;
    }
}
