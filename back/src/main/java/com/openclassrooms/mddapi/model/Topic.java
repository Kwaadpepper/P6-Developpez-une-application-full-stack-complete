package com.openclassrooms.mddapi.model;

import java.time.ZonedDateTime;
import java.util.UUID;

import com.openclassrooms.mddapi.valueobject.Slug;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(schema = "mddapi", name = "topics")
public class Topic implements Model {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID uuid;

  @AttributeOverride(name = "value", column = @Column(name = "slug", nullable = false, length = 255))
  private Slug slug;

  @Column(nullable = false, length = 255)
  private String name;

  @Column(nullable = false, length = 2000)
  private String description;

  @Column(nullable = false)
  private final ZonedDateTime createdAt;

  @Column(nullable = false)
  private final ZonedDateTime updatedAt;

  public Topic(
      final Slug slug,
      final String name,
      final String description) {
    this.slug = slug;
    this.name = name;
    this.description = description;
    createdAt = ZonedDateTime.now();
    updatedAt = ZonedDateTime.now();
  }

  // Required By JPA
  protected Topic() {
    slug = null;
    name = null;
    description = null;
    createdAt = null;
    updatedAt = null;
  }

  public UUID getUuid() {
    return this.uuid;
  }

  public Slug getSlug() {
    return this.slug;
  }

  public String getName() {
    return this.name;
  }

  public String getDescription() {
    return this.description;
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
        ", name=" + name +
        ", description=" + description +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt
        + "]";
  }
}
