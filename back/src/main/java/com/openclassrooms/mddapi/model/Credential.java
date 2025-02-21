package com.openclassrooms.mddapi.model;

import java.time.ZonedDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.openclassrooms.mddapi.valueobject.PasswordHash;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(schema = "mddapi", name = "credentials")
public class Credential implements UserDetails, Model {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID uuid;

  @AttributeOverride(name = "value", column = @Column(name = "password", nullable = false, length = 255))
  private PasswordHash password;

  @Column(nullable = false, name = "api_token")
  private UUID apiToken;

  @ManyToOne(optional = false, fetch = FetchType.EAGER)
  @JoinColumn(name = "user_uuid")
  private final User user;

  @Column(nullable = false)
  private final ZonedDateTime createdAt;

  @Column(nullable = false)
  private final ZonedDateTime updatedAt;

  public Credential(
      final PasswordHash password,
      final User user) {
    this.password = password;
    this.user = user;
    this.apiToken = UUID.randomUUID();
    createdAt = ZonedDateTime.now();
    updatedAt = ZonedDateTime.now();
  }

  // Required By JPA
  protected Credential() {
    password = null;
    user = null;
    createdAt = null;
    updatedAt = null;
  }

  public UUID getUuid() {
    return this.uuid;
  }

  public User getUser() {
    return this.user;
  }

  public UUID getApiToken() {
    return this.apiToken;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of();
  }

  @Override
  public String getPassword() {
    return this.password.value();
  }

  public PasswordHash getRealPassword() {
    return this.password;
  }

  public void setPassword(final PasswordHash password) {
    this.password = password;
  }

  @Override
  public String getUsername() {
    return this.apiToken.toString();
  }

  @Override
  public String toString() {
    return this.getClass().getName() +
        " [uuid=" + uuid +
        ", createdAt=" + createdAt +
        ", updatedAt=" + updatedAt
        + "]";
  }
}
