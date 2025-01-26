package com.openclassrooms.mddapi.valueobject;

import java.util.List;

import org.springframework.http.ResponseCookie;

import com.openclassrooms.mddapi.lib.ReadOnlyList;
import com.openclassrooms.mddapi.model.User;

public record AuthenticatedResponse(
        ReadOnlyList<ResponseCookie> cookieList,
        User user) {

    public static AuthenticatedResponse of(List<ResponseCookie> cookieList, User user) {
        return new AuthenticatedResponse(new ReadOnlyList<>(cookieList), user);
    }
}
