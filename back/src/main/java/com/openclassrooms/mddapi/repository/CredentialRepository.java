package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Credential;

@Repository
public interface CredentialRepository extends CrudRepository<Credential, UUID> {
    /**
     * Retrieves an entity by its apiToken.
     *
     * @param apiToken must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal apiToken} is {@literal null}.
     */
    Optional<Credential> findByApiToken(UUID apiToken);

    /**
     * Retrieves an entity by its userUuid.
     *
     * @param userUuid must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal userUuid} is {@literal null}.
     */
    Optional<Credential> findByUserUuid(UUID userUuid);
}
