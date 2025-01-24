package com.openclassrooms.mddapi.request.comment;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

//@formatter:off
public record CreateCommentRequest(

    @NotNull
    @NotEmpty
    @Size(min = 4, max = 500)
    String content,

    @NotNull
    UUID post

) {
}