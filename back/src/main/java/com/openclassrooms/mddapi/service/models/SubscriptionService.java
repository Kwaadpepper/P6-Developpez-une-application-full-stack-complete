package com.openclassrooms.mddapi.service.models;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Subscription;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;

@Service
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(final SubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    public Iterable<Subscription> getUserSubscriptions(final User user) {
        var userUuid = user.getUuid();
        return subscriptionRepository.findAllByUserUuid(userUuid);
    }
}
