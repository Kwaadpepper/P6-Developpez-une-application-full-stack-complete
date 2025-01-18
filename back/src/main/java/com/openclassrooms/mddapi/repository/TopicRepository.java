package com.openclassrooms.mddapi.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.Topic;

@Repository
public interface TopicRepository extends PagingAndSortingRepository<Topic, UUID>, CrudRepository<Topic, UUID> {
    /**
     * Returns a {@link Page} of entities meeting the paging restriction provided in
     * the {@link Pageable} object.
     *
     * @param pageable the pageable to request a paged result, can be
     *                 {@link Pageable#unpaged()}, must not be
     *                 {@literal null}.
     * @return a page of entities
     */
    Page<Topic> findAll(Pageable pageable);

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
