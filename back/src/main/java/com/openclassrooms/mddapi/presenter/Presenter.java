package com.openclassrooms.mddapi.presenter;

public interface Presenter<U extends Record, M> {
  U present(M model);
}
