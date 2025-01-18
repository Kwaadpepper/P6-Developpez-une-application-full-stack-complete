package com.openclassrooms.mddapi.dto;

import java.util.Date;
import java.util.Map;

//@formatter:off
public record ValidationErrorDetails(

    Date timestamp,
    String message,
    Map<String, String> errors,
    String uri

) {
}
