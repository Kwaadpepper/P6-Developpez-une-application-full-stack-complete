package com.openclassrooms.mddapi.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.query_dto.TopicWithSubscription;

@Repository
public interface TopicRepository extends PagingAndSortingRepository<Topic, UUID>, CrudRepository<Topic, UUID> {
    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in
     * the {@link Pageable} object.
     *
     * @param userUuid the userUuid to request comments for, must not be
     *                 {@literal null}.
     * @param pageable the pageable to request a paged result, can be
     *                 {@link Pageable#unpaged()}, must not be
     *                 {@literal null}.
     * @return a page of entities
     */
    @Query(value = "SELECT t.uuid AS uuid," +
            " t.slug AS slug," +
            " t.name AS name," +
            " t.description AS description," +
            " (CASE WHEN s.user_uuid IS NOT NULL THEN true ELSE false END) as subscribed," +
            " t.created_at AS created_at," +
            " t.updated_at AS updated_at" +
            " FROM mddapi.topics AS t" +
            " LEFT OUTER JOIN mddapi.subscriptions AS s ON t.uuid = s.topic_uuid AND s.user_uuid = :useruuid" +
            " WHERE LOWER(t.name) LIKE LOWER(CONCAT('%', :title, '%'))" +
            " ORDER BY t.updated_at DESC", nativeQuery = true)
    Page<TopicWithSubscription> findAllWithSubscribedByNameIgnoreCaseContaining(
            @Param("useruuid") UUID userUuid,
            Pageable pageable,
            @Param("title") String title);

    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in
     * the {@link Pageable} object.
     *
     * @param title    the title to search for, must not be {@literal null}.
     * @param pageable the pageable to request a paged result, can be
     *                 {@link Pageable#unpaged()}, must not be
     *                 {@literal null}.
     * @return a page of entities
     */
    Page<Topic> findAllByNameIgnoreCaseContaining(String title, Pageable pageable);
}
