package com.openclassrooms.mddapi.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Post;

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
}
