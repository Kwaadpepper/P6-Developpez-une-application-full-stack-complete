package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.valueobject.Slug;

@Repository
public interface PostRepository extends PagingAndSortingRepository<Post, UUID>, CrudRepository<Post, UUID> {
    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in
     * the {@link Pageable} object.
     *
     * @param authorUuid the author's UUID to search for
     * @param pageable   the pageable to request a paged result, can be
     *                   {@link Pageable#unpaged()}, must not be
     *                   {@literal null}.
     * @return a page of entities
     */
    Page<Post> findAllByAuthorUuid(UUID authorUuid, Pageable pageable);

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
