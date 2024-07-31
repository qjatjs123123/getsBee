package com.ssafy.getsbee.domain.auth.dto.response;

public record TokenResponse(
        String grantType,
        String accessToken,
        String refreshToken
) {

    public static TokenResponse of(String grantType, String accessToken, String refreshToken) {
        return new TokenResponse(grantType, accessToken, refreshToken);
    }
}