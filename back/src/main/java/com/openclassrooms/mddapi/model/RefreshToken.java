package com.openclassrooms.mddapi.model;

import java.time.ZonedDateTime;
import java.util.UUID;

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
@Table(schema = "mddapi", name = "refresh_tokens")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID uuid;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_uuid")
    private final User user;

    @Column(nullable = false)
    private UUID token;

    @Column(nullable = false)
    private ZonedDateTime expiryDate;

    public RefreshToken(
            final User user,
            final ZonedDateTime expiryDate) {
        this.user = user;
        this.token = UUID.randomUUID();
        this.expiryDate = expiryDate;
    }

    // Required By JPA
    protected RefreshToken() {
        user = null;
        token = null;
        expiryDate = null;
    }

    public UUID getUuid() {
        return uuid;
    }

    public User getUser() {
        return user;
    }

    public UUID getToken() {
        return token;
    }

    public ZonedDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(ZonedDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return this.getClass().getName() +
                " [uuid=" + uuid +
                ", user=" + user.getUuid() +
                ", token=" + token +
                ", expiryDate=" + expiryDate
                + "]";
    }
}
