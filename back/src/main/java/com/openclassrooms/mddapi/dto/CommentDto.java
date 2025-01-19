package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.openclassrooms.mddapi.query_dto.CommentWithAuthor;

public record CommentDto(
        UUID uuid,
        String content,
        UUID post_uuid,
        UUID author_uuid,
        String author_name,
        ZonedDateTime created_at,
        ZonedDateTime updated_at) {

    public static CommentDto of(
            final CommentWithAuthor commentAuthor) {
        return new CommentDto(
                commentAuthor.getUuid(),
                commentAuthor.getContent(),
                commentAuthor.getPostUuid(),
                commentAuthor.getAuthorUuid(),
                commentAuthor.getAuthorName(),
                commentAuthor.getCreatedAt(),
                commentAuthor.getUpdatedAt());
    }
}
