package com.openclassrooms.mddapi.repository.comments;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.query_dto.CommentWithAuthor;

@Repository
public interface CommentQueryRepository extends PagingAndSortingRepository<CommentWithAuthor, UUID> {

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in
     * the {@link Pageable} object.
     *
     * @param postUuid the postUuid to request comments for, must not be
     *                 {@literal null}.
     * @param pageable the pageable to request a paged result, can be
     *                 {@link Pageable#unpaged()}, must not be
     *                 {@literal null}.
     * @return a page of entities
     */
    @Query(value = "SELECT c.uuid AS uuid," +
            " c.content AS content," +
            " c.post_uuid AS post_uuid," +
            " c.author_uuid AS author_uuid," +
            " u.name AS author_name," +
            " c.created_at AS created_at," +
            " c.updated_at AS updated_at" +
            " FROM mddapi.comments AS c" +
            " JOIN mddapi.users AS u ON u.uuid = c.author_uuid" +
            " WHERE c.post_uuid = :postuuid" +
            " ORDER BY c.updated_at DESC", nativeQuery = true)
    Page<CommentWithAuthor> findAllByPostUuid(@Param("postuuid") UUID postUuid, Pageable pageable);

}
