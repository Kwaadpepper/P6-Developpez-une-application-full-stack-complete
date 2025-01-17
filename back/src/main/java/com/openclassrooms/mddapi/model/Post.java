package com.openclassrooms.mddapi.model;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "mddapi", name = "posts")
public class Post implements Model {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID uuid;

  @Column(nullable = false, length = 255)
  private String slug;

  @Column(nullable = false, length = 255)
  private String title;

  @Column(nullable = false)
  private String content;

  @ManyToOne(optional = false)
  @JoinColumn(name = "topic_uuid")
  private final Topic topic;

  @ManyToOne(optional = false)
  @JoinColumn(name = "author_uuid")
  private final User author;

  @Column(nullable = false)
  private final ZonedDateTime createdAt;

  @Column(nullable = false)
  private final ZonedDateTime updatedAt;

  public Post(
      final String slug,
      final String title,
      final String content,
      final Topic topic,
      final User author) {
    this.slug = slug;
    this.title = title;
    this.content = content;
    this.topic = topic;
    this.author = author;
    createdAt = ZonedDateTime.now();
    updatedAt = ZonedDateTime.now();
  }

  // Required By JPA
  protected Post() {
    this.slug = null;
    this.title = null;
    this.content = null;
    this.topic = null;
    this.author = null;
    createdAt = null;
    updatedAt = null;
  }

  public UUID getUuid() {
    return this.uuid;
  }

  public String getSlug() {
    return this.slug;
  }

  public String getTitle() {
    return this.title;
  }

  public String getContent() {
    return this.content;
  }

  public Topic getTopic() {
    return this.topic;
  }

  public User getAuthor() {
    return this.author;
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
        ", slug=" + slug +
        ", title=" + title +
        ", content=" + content +
        ", topic=" + topic +
        ", author=" + author +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt
        + "]";
  }
}
