package com.openclassrooms.mddapi.query_dto;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public final class TopicWithSubscription {

    private final @Id UUID uuid;
    private final String slug;
    private final String name;
    private final String description;
    private final Boolean subscribed;
    private final ZonedDateTime createdAt;
    private final ZonedDateTime updatedAt;

    // Required By JPA
    protected TopicWithSubscription() {
        uuid = null;
        slug = null;
        name = null;
        description = null;
        subscribed = null;
        createdAt = null;
        updatedAt = null;
    }

    /**
     * @return UUID return the uuid
     */
    public UUID getUuid() {
        return uuid;
    }

    /**
     * Set the UUID of the topic.
     *
     * @param uuid The UUID of the topic.
     */
    public void setUuid(UUID uuid) {
        // Do nothing
    }

    /**
     * @return The slug of the topic.
     */
    public String getSlug() {
        return slug;
    }

    /**
     * Set the slug of the topic.
     *
     * @param slug The slug of the topic.
     */
    public void setSlug(String slug) {
        // Do nothing
    }

    /**
     * @return String return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Set the name of the topic.
     *
     * @param name The name of the topic.
     */
    public void setName(String name) {
        // Do nothing
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Set the description of the topic.
     *
     * @param description The description of the topic.
     */
    public void setDescription(String description) {
        // Do nothing
    }

    /**
     * @return Boolean return the subscribed status of the topic.
     */
    public Boolean getSubscribed() {
        return subscribed;
    }

    /**
     * Set the subscribed status of the topic.
     *
     * @param subscribed The subscribed status of the topic.
     */
    public void setSubscribed(Boolean subscribed) {
        // Do nothing
    }

    /**
     * @return ZonedDateTime return the created_at
     */
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Set the created at date of the topic.
     *
     * @param createdAt The created at date of the topic.
     */
    public void setCreatedAt(ZonedDateTime createdAt) {
        // Do nothing
    }

    /**
     * @return ZonedDateTime return the updated_at
     */
    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }

    /**
     * Set the updated at date of the topic.
     *
     * @param updatedAt The updated at date of the topic.
     */
    public void setUpdatedAt(ZonedDateTime updatedAt) {
        // Do nothing
    }
}