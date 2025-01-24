package com.openclassrooms.mddapi.cron;

import java.util.logging.Logger;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.openclassrooms.mddapi.service.auth.RefreshTokenService;

@Configuration
@EnableScheduling
public class Tasks {
    private static final Logger logger = Logger.getLogger(Tasks.class.getName());
    private final RefreshTokenService refreshTokenService;

    public Tasks(final RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }

    /**
     * Remove outdated refresh tokens every hour.
     */
    @Scheduled(cron = "0 0 * * * ?")
    public void removeOutdatedRefreshTokens() {
        logger.info("Removing outdated refresh tokens...");
        refreshTokenService.removeOutdatedRefreshTokens();
        logger.info("Outdated refresh tokens removed.");
    }
}
