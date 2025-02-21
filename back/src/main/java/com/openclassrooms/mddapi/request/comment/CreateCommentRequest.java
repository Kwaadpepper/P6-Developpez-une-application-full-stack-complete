package com.openclassrooms.mddapi.request.comment;

import java.util.UUID;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateCommentRequest {
    @NotNull
    @NotEmpty
    @Size(min = 4, max = 255)
    private final String content;
    @NotNull
    private final UUID post;

    public CreateCommentRequest(
            String content,
            UUID post) {
        this.post = post;
        this.content = content;
    }

    public String getContent() {
        // Don't sanitize content here, it will be done in the service layer
        return content;
    }

    public UUID getPost() {
        return post;
    }
}