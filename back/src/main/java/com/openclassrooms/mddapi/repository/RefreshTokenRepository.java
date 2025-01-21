package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.RefreshToken;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, UUID> {

    /**
     * Retrieves an entity by its token.
     *
     * @param token must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal token} is {@literal null}.
     */
    Optional<RefreshToken> findByToken(UUID token);

    /**
     * Retrieves an entity by its userUuid.
     *
     * @param userUuid must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal userUuid} is {@literal null}.
     */
    Optional<RefreshToken> findByUserUuid(UUID userUuid);

    /**
     * Deletes the entity with the given userUuid.
     *
     * If the entity is not found in the persistence store it is silently ignored.
     *
     * @param userUuid must not be {@literal null}.
     * @throws IllegalArgumentException in case the given {@literal userUuid} is
     *                                  {@literal null}
     */
    int deleteByUserUuid(UUID userUuid);
}
