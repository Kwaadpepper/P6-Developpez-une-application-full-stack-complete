package com.openclassrooms.mddapi.service.auth;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.configuration.AppConfiguration;
import com.openclassrooms.mddapi.exception.exceptions.RefreshExpiredException;
import com.openclassrooms.mddapi.model.RefreshToken;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {
    private final AppConfiguration appConfiguration;
    private final RefreshTokenRepository refreshTokenRepository;

    RefreshTokenService(
            final AppConfiguration appConfiguration,
            final RefreshTokenRepository refreshTokenRepository) {
        this.appConfiguration = appConfiguration;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public Optional<RefreshToken> findByToken(UUID token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken getRefreshToken(User user) {
        final RefreshToken refreshToken;
        final var userUuid = user.getUuid();
        final var refreshTokenDurationMs = appConfiguration.jwtRefreshExpirationMs;
        final var expiryDate = ZonedDateTime.now();

        expiryDate.plus(refreshTokenDurationMs, ChronoUnit.MILLIS);

        refreshToken = refreshTokenRepository.findByUserUuid(userUuid)
                .map(token -> {
                    token.setExpiryDate(expiryDate);
                    return token;
                })
                .orElse(new RefreshToken(user, expiryDate));

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) throws RefreshExpiredException {
        if (token.getExpiryDate().compareTo(ZonedDateTime.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new RefreshExpiredException();
        }

        return token;
    }

    public int deleteByUser(User user) {
        return refreshTokenRepository.deleteByUserUuid(user.getUuid());
    }
}
