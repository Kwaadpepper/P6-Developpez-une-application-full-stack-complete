package com.openclassrooms.mddapi.dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.openclassrooms.mddapi.model.Post;

public record PostDto(
        UUID uuid,
        String slug,
        String title,
        String content,
        UUID topic_uuid,
        String topic_name,
        UUID author_uuid,
        String author_name,
        ZonedDateTime created_at,
        ZonedDateTime updated_at) {

    public static PostDto of(Post post) {
        return new PostDto(
                post.getUuid(),
                post.getSlug().value(),
                post.getTitle(),
                post.getContent(),
                post.getTopic().getUuid(),
                post.getTopic().getName(),
                post.getAuthor().getUuid(),
                post.getAuthor().getName(),
                post.getCreatedAt(),
                post.getUpdatedAt());
    }
}
