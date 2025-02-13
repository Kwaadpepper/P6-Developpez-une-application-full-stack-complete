package com.openclassrooms.mddapi.request.comment;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateCommentRequest {
    private final String content;
    private final UUID post;

    public CreateCommentRequest(
            @NotNull @NotEmpty @Size(min = 4, max = 255) String content,
            @NotNull UUID post) {
        this.post = post;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public UUID getPost() {
        return post;
    }
}