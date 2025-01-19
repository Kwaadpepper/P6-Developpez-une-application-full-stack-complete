package com.openclassrooms.mddapi.service.models;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.exception.exceptions.ValidationException;
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

    public Iterable<Subscription> getUserSubscriptions(final User user) {
        var userUuid = user.getUuid();
        return subscriptionRepository.findAllByUserUuid(userUuid);
    }

    public void subscribeUserOnTopic(final UUID userUuid, final UUID topicUuid) {
        var alreadyExists = subscriptionRepository.existsByUserUuidAndTopicUuid(userUuid, topicUuid);

        if (alreadyExists) {
            return;
        }

        var user = userRepository.findById(userUuid)
                .orElseThrow(() -> new ValidationException("User not found"));
        var topic = topicRepository.findById(topicUuid)
                .orElseThrow(() -> new ValidationException("Topic not found"));

        var subscription = new Subscription(topic, user);
        subscriptionRepository.save(subscription);
    }

    public void unSubscribeUserOnTopic(final UUID userUuid, final UUID topicUuid) {
        var subscription = subscriptionRepository.findByUserUuidAndTopicUuid(userUuid, topicUuid).orElse(null);

        if (subscription == null) {
            return;
        }

        subscriptionRepository.delete(subscription);
    }
}
