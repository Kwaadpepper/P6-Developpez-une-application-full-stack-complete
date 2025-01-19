package com.openclassrooms.mddapi.service.auth;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ServerErrorException;
import com.openclassrooms.mddapi.model.Credential;
import com.openclassrooms.mddapi.model.User;

@Service
public class SessionService {
    private static final Logger logger = LogManager.getLogger(SessionService.class);

    public User getAuthenticatedUser() {
        final var authentication = SecurityContextHolder.getContext().getAuthentication();
        return toUser(authentication);
    }

    /**
     * Convert an {@link Authentication} to a {@link User}
     *
     * @param authentication The authentication to convert
     * @return {@link User}
     * @throws ServerErrorException If the principal is not a {@link User}
     */
    public User toUser(final Authentication authentication) throws ServerErrorException {
        final var principal = authentication.getPrincipal();

        if (!(principal instanceof Credential)) {
            logger.debug("Given authentication principal is not a Credential instance.");
            throw new ServerErrorException("Expected principal to be a '%s' instance given is '%s'"
                    .formatted(Credential.class, principal.getClass()));
        }

        return ((Credential) principal).getUser();
    }
}
