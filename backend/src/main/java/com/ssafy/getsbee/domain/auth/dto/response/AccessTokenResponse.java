package com.ssafy.getsbee.domain.auth.dto.response;

public record AccessTokenResponse(
        String grantType,
        String accessToken,
        Long accessTokenExpiresIn) {

    public static AccessTokenResponse of(String grantType, String accessToken, Long accessTokenExpiresIn) {
        return new AccessTokenResponse(grantType, accessToken, accessTokenExpiresIn);
    }
}