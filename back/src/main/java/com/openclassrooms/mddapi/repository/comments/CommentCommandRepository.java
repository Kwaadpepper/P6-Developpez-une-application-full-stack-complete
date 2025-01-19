package com.openclassrooms.mddapi.repository.comments;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Comment;

@Repository
public interface CommentCommandRepository extends CrudRepository<Comment, UUID> {

    /**
     * Retrieves an entity by its postUuid.
     *
     * @param postUuid must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal postUuid} is {@literal null}.
     */
    Optional<Comment> findByPostUuid(UUID postUuid);

}
