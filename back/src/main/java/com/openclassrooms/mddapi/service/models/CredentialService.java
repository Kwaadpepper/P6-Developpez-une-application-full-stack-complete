package com.openclassrooms.mddapi.service.models;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Credential;
import com.openclassrooms.mddapi.repository.CredentialRepository;

@Service
public class CredentialService {
  private final CredentialRepository credentialRepository;

  public CredentialService(final CredentialRepository credentialRepository) {
    this.credentialRepository = credentialRepository;
  }

  public void deleteCredential(final UUID uuid) {
    credentialRepository.deleteById(uuid);
  }

  public Optional<Credential> getCredential(final UUID uuid) {
    return credentialRepository.findById(uuid);
  }

  public Optional<Credential> getCredentialFromApiToken(final UUID apiToken) {
    return credentialRepository.findByApiToken(apiToken);
  }

  public Iterable<Credential> getCredentials() {
    return credentialRepository.findAll();
  }

  public Credential saveCredential(final Credential Credential) {
    return credentialRepository.save(Credential);
  }

}
