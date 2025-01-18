package com.openclassrooms.mddapi.dto;

//@formatter:off
public record JwtDto(

    String token

) {
  public static JwtDto of(final String token) {
    return new JwtDto(token);
  }
}
