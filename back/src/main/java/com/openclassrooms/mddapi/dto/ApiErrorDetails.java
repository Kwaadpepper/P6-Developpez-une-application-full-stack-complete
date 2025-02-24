package com.openclassrooms.mddapi.dto;

import java.util.Date;

//@formatter:off
public record ApiErrorDetails(

    Date timestamp,
    String message,
    String uri

) {
}
