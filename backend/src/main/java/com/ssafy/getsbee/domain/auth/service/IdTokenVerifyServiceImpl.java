package com.ssafy.getsbee.domain.auth.service;

import com.google.auth.oauth2.TokenVerifier;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static com.google.api.client.json.webtoken.JsonWebToken.*;
import static com.google.auth.oauth2.TokenVerifier.newBuilder;
import static com.ssafy.getsbee.global.error.ErrorCode.INVALID_ID_TOKEN;

@Component
public class IdTokenVerifyServiceImpl implements IdTokenVerifyService{

    @Value("${google.oidc.audience}")
    private String googleOidcAudience;

    @Override
    public Payload verifyGoogleIdToken(String idToken) {
        try {
            TokenVerifier tokenVerifier = newBuilder()
                    .setAudience(googleOidcAudience)
                    .build();
            return tokenVerifier.verify(idToken).getPayload();
        } catch (TokenVerifier.VerificationException e) {
            throw new BadRequestException(INVALID_ID_TOKEN);
        }
    }
}
