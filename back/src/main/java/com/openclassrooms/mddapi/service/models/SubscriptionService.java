package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
import com.openclassrooms.mddapi.exception.exceptions.ValidationException.ValidationError;
import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.TopicRepository;
import com.openclassrooms.mddapi.repository.UserRepository;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;
    private final TopicRepository topicRepository;
    private final UserRepository userRepository;

    public SubscriptionService(
            final SubscriptionRepository subscriptionRepository,
            final TopicRepository topicRepository,
            final UserRepository userRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get all subscriptions of a user
     *
     * @param user The user
     * @param page The page
     * @return {@link Page} of {@link Subscription}
     */
    public Page<Subscription> getUserSubscriptions(final User user, PageRequest page) {
        var userUuid = user.getUuid();
        return subscriptionRepository.findAllByUserUuidOrderByCreatedAtDesc(userUuid, page);
    }

    /**
     * Subscribe a user to a topic
     *
     * @param userUuid  The user UUID
     * @param topicUuid The topic UUID
     * @return void
     */
    public void subscribeUserOnTopic(final UUID userUuid, final UUID topicUuid) {
        var alreadyExists = subscriptionRepository.existsByUserUuidAndTopicUuid(userUuid, topicUuid);

        if (alreadyExists) {
            return;
        }

        var user = userRepository.findById(userUuid)
                .orElseThrow(() -> ValidationException.of(ValidationError.of("user", "User not found")));
        var topic = topicRepository.findById(topicUuid)
                .orElseThrow(() -> ValidationException.of(ValidationError.of("topic", "Topic not found")));

        var subscription = new Subscription(topic, user);
        subscriptionRepository.save(subscription);
    }

    /**
     * Unsubscribe a user from a topic
     *
     * @param userUuid  The user UUID
     * @param topicUuid The topic UUID
     * @return void
     */
    public void unSubscribeUserOnTopic(final UUID userUuid, final UUID topicUuid) {
        var subscription = subscriptionRepository.findByUserUuidAndTopicUuid(userUuid, topicUuid).orElse(null);

        if (subscription == null) {
            return;
        }

        subscriptionRepository.delete(subscription);
    }
}
