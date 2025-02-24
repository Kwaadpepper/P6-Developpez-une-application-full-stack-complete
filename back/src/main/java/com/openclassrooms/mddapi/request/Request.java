package com.openclassrooms.mddapi.request;

import java.util.function.Function;

import org.springframework.lang.Nullable;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException.ValidationError;

public interface Request {
    /** Validate a field or throw ValidationException. */
    static <ToT extends Record, FromT> ToT validate(
            String fieldName,
            @Nullable FromT from,
            Function<FromT, ToT> validator)
            throws ValidationException {
        try {
            return validator.apply(from);
        } catch (IllegalStateException e) {
            throw ValidationException.of(ValidationError.of(fieldName, e.getMessage()));
        }
    }

    /** Validate a field or throw ValidationException. */
    static <E extends Enum<E>, ToT extends Enum<E>, FromT> ToT validateEnum(
            String fieldName,
            @Nullable FromT from,
            Function<FromT, ToT> validator)
            throws ValidationException {
        try {
            return validator.apply(from);
        } catch (IllegalStateException e) {
            throw ValidationException.of(ValidationError.of(fieldName, e.getMessage()));
        }
    }
}
