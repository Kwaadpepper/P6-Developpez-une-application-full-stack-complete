package com.openclassrooms.mddapi.service.auth;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
import com.openclassrooms.mddapi.exception.exceptions.RefreshExpiredException;
import com.openclassrooms.mddapi.model.RefreshToken;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final long refreshTokenDuration;

    RefreshTokenService(
            final AppConfiguration appConfiguration,
            final RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenDuration = appConfiguration.getJwtRefreshExpiration();
        this.refreshTokenRepository = refreshTokenRepository;
    }

    /**
     * Find a refresh token by token value
     *
     * @param tokenValue {@link UUID}
     * @return {@link Optional} of {@link RefreshToken}
     */
    public Optional<RefreshToken> findByToken(UUID tokenValue) {
        return refreshTokenRepository.findByToken(tokenValue);
    }

    /**
     * Create a new refresh token
     *
     * @param user {@link User}
     * @return {@link RefreshToken}
     */
    public RefreshToken getExpandedRefreshToken(User user) {
        final RefreshToken refreshToken;
        final var userUuid = user.getUuid();
        final var expiryDate = ZonedDateTime.now().plus(refreshTokenDuration, ChronoUnit.MINUTES);

        refreshToken = refreshTokenRepository.findByUserUuid(userUuid)
                .map(token -> {
                    token.setExpiryDate(expiryDate);
                    return token;
                })
                .orElse(new RefreshToken(user, expiryDate));

        return refreshTokenRepository.save(refreshToken);
    }

    /**
     * Verify refresh token expiration
     *
     * @param token {@link RefreshToken}
     * @return {@link RefreshToken}
     * @throws RefreshExpiredException If token is expired
     */
    public RefreshToken verifyExpiration(RefreshToken token) throws RefreshExpiredException {
        if (ZonedDateTime.now().compareTo(token.getExpiryDate()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RefreshExpiredException();
        }

        return token;
    }

    /**
     * Delete refresh token by user
     *
     * @param user {@link User}
     * @return int Number of deleted tokens
     */
    @Transactional
    public int deleteByUser(User user) {
        return refreshTokenRepository.deleteByUserUuid(user.getUuid());
    }

    /**
     * Remove outdated refresh tokens
     */
    @Transactional
    public void removeOutdatedRefreshTokens() {
        refreshTokenRepository.deleteByExpiryDateBefore(ZonedDateTime.now());
    }
}
