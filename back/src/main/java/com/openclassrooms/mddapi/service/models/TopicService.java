package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
public class TopicService {
    private final TopicRepository topicRepository;

    public TopicService(final TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public Page<Topic> getPaginatedTopics(PageRequest page) {
        if (page.getPageSize() > 50) {
            throw new IllegalArgumentException("Page size must be less than or equal to 50");
        }
        return topicRepository.findAll(page);
    }

    public Page<TopicName> getPaginatedTopicsNamesWhere(PageRequest page, String nameLike) {
        if (page.getPageSize() > 50) {
            throw new IllegalArgumentException("Page size must be less than or equal to 50");
        }
        return topicRepository.findAllByNameIgnoreCaseContaining(nameLike, page)
                .map(v -> new TopicName(v.getUuid(), v.getName()));
    }

    public Page<TopicName> getPaginatedTopicsNames(PageRequest page) {
        if (page.getPageSize() > 50) {
            throw new IllegalArgumentException("Page size must be less than or equal to 50");
        }
        return topicRepository.findAll(page).map(v -> new TopicName(v.getUuid(), v.getName()));
    }

    public record TopicName(UUID uuid, String name) {
    }
}
