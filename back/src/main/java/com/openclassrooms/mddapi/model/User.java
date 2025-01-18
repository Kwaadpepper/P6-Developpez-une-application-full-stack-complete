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
@Table(schema = "mddapi", name = "users")
public class User implements Model {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID uuid;

  @Column(nullable = false, length = 255)
  private String name;

  @Column(nullable = false, length = 255)
  private String email;

  @Column(nullable = false)
  private final ZonedDateTime createdAt;

  @Column(nullable = false)
  private final ZonedDateTime updatedAt;

  public User(
      final String email) {
    this.email = email;
    createdAt = ZonedDateTime.now();
    updatedAt = ZonedDateTime.now();
  }

  // Required By JPA
  protected User() {
    email = null;
    createdAt = null;
    updatedAt = null;
  }

  public UUID getUuid() {
    return this.uuid;
  }

  public String getName() {
    return this.name;
  }

  public String getEmail() {
    return this.email;
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
        ", name=" + name +
        ", email=" + email +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt
        + "]";
  }
}
