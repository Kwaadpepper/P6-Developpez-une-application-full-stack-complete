package com.openclassrooms.mddapi.model;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema = "mddapi", name = "comments")
public class Comment implements Model {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID uuid;

  @Column(nullable = false, length = 500)
  private String content;

  @Column(nullable = false)
  private final UUID postUuid;

  @Column(nullable = false)
  private final UUID authorUuid;

  @Column(nullable = false)
  private final ZonedDateTime createdAt;

  @Column(nullable = false)
  private final ZonedDateTime updatedAt;

  public Comment(
      final String content,
      final Post post,
      final User author) {
    this.content = content;
    this.postUuid = post.getUuid();
    this.authorUuid = author.getUuid();
    createdAt = ZonedDateTime.now();
    updatedAt = ZonedDateTime.now();
  }

  // Required By JPA
  protected Comment() {
    content = null;
    postUuid = null;
    authorUuid = null;
    createdAt = null;
    updatedAt = null;
  }

  public UUID getUuid() {
    return this.uuid;
  }

  public String getContent() {
    return this.content;
  }

  public UUID getPostUuid() {
    return this.postUuid;
  }

  public UUID getAuthorUuid() {
    return this.authorUuid;
  }

  public ZonedDateTime getCreatedAt() {
    return this.createdAt;
  }

  public ZonedDateTime getUpdatedAt() {
    return this.updatedAt;
  }

  @Override
  public String toString() {
    return this.getClass().getName() +
        " [uuid=" + uuid +
        ", content=" + content +
        ", postUuid=" + postUuid +
        ", authorUuid=" + authorUuid +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt
        + "]";
  }
}
