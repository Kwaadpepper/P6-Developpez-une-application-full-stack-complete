package com.openclassrooms.mddapi.query_dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public final class CommentWithAuthor {

    private final @Id UUID uuid;
    private final String content;
    private final UUID postUuid;
    private final UUID authorUuid;
    private final String authorName;
    private final ZonedDateTime createdAt;
    private final ZonedDateTime updatedAt;

    // Required By JPA
    protected CommentWithAuthor() {
        uuid = null;
        content = null;
        postUuid = null;
        authorUuid = null;
        authorName = null;
        createdAt = null;
        updatedAt = null;
    }

    /**
     * @return UUID return the uuid
     */
    public UUID getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        // Do nothing
    }

    /**
     * @return String return the content
     */
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        // Do nothing
    }

    /**
     * @return UUID return the post_uuid
     */
    public UUID getPostUuid() {
        return postUuid;
    }

    /**
     * @return UUID return the author_uuid
     */
    public UUID getAuthorUuid() {
        return authorUuid;
    }

    public void setAuthorUuid(UUID authorUuid) {
        // Do nothing
    }

    /**
     * @return String return the author_name
     */
    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        // Do nothing
    }

    /**
     * @return ZonedDateTime return the created_at
     */
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        // Do nothing
    }

    /**
     * @return ZonedDateTime return the updated_at
     */
    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(ZonedDateTime updatedAt) {
        // Do nothing
    }
}
