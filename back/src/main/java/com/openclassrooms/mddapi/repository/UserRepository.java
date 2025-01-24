package com.openclassrooms.mddapi.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.valueobject.Email;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
    /**
     * Retrieves an entity by its email.
     *
     * @param email must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal email} is {@literal null}.
     */
    Optional<User> findByEmail(Email email);

    /**
     * Retrieves an entity by its name.
     *
     * @param name must not be {@literal null}.
     * @return the entity with the given id or {@literal Optional#empty()} if none
     *         found.
     * @throws IllegalArgumentException if {@literal name} is {@literal null}.
     */
    Optional<User> findByName(String name);
}
