package com.ssafy.getsbee.domain.auth.dto.response;

public record AccessTokenResponse(
        String grantType,
        String accessToken
) {

    public static AccessTokenResponse of(String grantType, String accessToken) {
        return new AccessTokenResponse(grantType, accessToken);
    }
}