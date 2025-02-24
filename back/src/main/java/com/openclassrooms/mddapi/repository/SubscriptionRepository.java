package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Subscription;

@Repository
public interface SubscriptionRepository extends CrudRepository<Subscription, UUID> {
    /**
     * Returns paginated entities with the given {@literal userUuid}.
     *
     * @param userUuid must not be {@literal null}.
     * @param pageable must not be {@literal null}.
     * @return a {@link Page} of entities with the given {@literal userUuid}.
     * @throws IllegalArgumentException if {@literal userUuid} is {@literal null}.
     */
    Page<Subscription> findAllByUserUuidOrderByCreatedAtDesc(UUID userUuid, Pageable pageable);

    /**
     * Returns whether an entity with the given uuids exists.
     *
     * @param userUuid  must not be {@literal null}.
     * @param topicUuid must not be {@literal null}.
     * @return {@literal true} if an entity with the given uuids exists,
     *         {@literal false} otherwise.
     * @throws IllegalArgumentException if {@literal userUuid} is {@literal null} or
     *                                  {@literal topicUuid} is {@literal null}.
     */
    boolean existsByUserUuidAndTopicUuid(UUID userUuid, UUID topicUuid);

    /**
     * Retrieves an entity by its {@literal userUuid} and {@literal topicUuid}.
     *
     * @param userUuid  must not be {@literal null}.
     * @param topicUuid must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal userUuid} is {@literal null} or
     *                                  {@literal topicUuid} is {@literal null}.
     */
    Optional<Subscription> findByUserUuidAndTopicUuid(UUID userUuid, UUID topicUuid);
}
