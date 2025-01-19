package com.openclassrooms.mddapi.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Subscription;

@Repository
public interface SubscriptionRepository extends CrudRepository<Subscription, UUID> {
    /**
     * Returns all instances of the type {@code T} with the given uuid.
     *
     * Note that the order of elements in the result is not guaranteed.
     *
     * @param userUuid must not be {@literal null}.
     * @return guaranteed to be not {@literal null}. The size can be equal to zero.
     * @throws IllegalArgumentException if {@literal userUuid} is {@literal null}.
     */
    Iterable<Subscription> findAllByUserUuid(UUID userUuid);

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
}
