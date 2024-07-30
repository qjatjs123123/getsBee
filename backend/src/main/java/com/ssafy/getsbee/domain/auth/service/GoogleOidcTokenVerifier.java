package com.ssafy.getsbee.domain.auth.service;

import com.google.auth.oauth2.TokenVerifier;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import static com.google.api.client.json.webtoken.JsonWebToken.*;
import static com.google.auth.oauth2.TokenVerifier.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
public class GoogleOidcTokenVerifier {

    @Value("${google.oidc.audience}")
    private String googleOidcAudience;

    public Payload verify(String idToken) {
        try {
            TokenVerifier tokenVerifier = newBuilder()
                    .setAudience(googleOidcAudience)
                    .build();
            return tokenVerifier.verify(idToken).getPayload();
        } catch (VerificationException e) {
            throw new BadRequestException(INVALID_ID_TOKEN);
        }
    }
}
