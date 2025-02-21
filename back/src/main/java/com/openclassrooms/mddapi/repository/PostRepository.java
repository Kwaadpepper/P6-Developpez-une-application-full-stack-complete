package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.valueobject.Slug;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, UUID>, CrudRepository<Post, UUID> {
    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in
     * the {@link Pageable} object.
     *
     * @param userUuid the userUuid to request posts for, must not be
     *                 {@literal null}.
     * @param pageable the pageable to request a paged result, can be
     *                 {@link Pageable#unpaged()}, must not be
     *                 {@literal null}.
     * @return a page of entities
     */
    @Query(value = "SELECT p" +
            " FROM Post p" +
            " WHERE p.topic " +
            " IN(" +
            "   SELECT s.topic" +
            "   FROM Subscription s" +
            "   WHERE s.user = :user" +
            " )" +
            " OR p.author = :user")
    Page<Post> getUserFeed(@Param("user") User user, Pageable pageable);

    /**
     * Returns whether an entity with the given slug exists.
     *
     * @param slug must not be {@literal null}.
     * @return {@literal true} if an entity with the given slug exists,
     *         {@literal false} otherwise.
     * @throws IllegalArgumentException if {@literal slug} is {@literal null}.
     */
    boolean existsBySlug(Slug slug);

    /**
     * Retrieves an entity by its slug.
     *
     * @param slug must not be {@literal null}.
     * @return the entity with the given slug or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal slug} is {@literal null}.
     */
    Optional<Post> findBySlug(Slug slug);
}
