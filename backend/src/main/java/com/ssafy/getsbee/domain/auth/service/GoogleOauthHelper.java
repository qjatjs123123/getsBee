package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.response.OidcDecodePayload;
import com.ssafy.getsbee.domain.auth.dto.response.OidcPublicKeysResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GoogleOauthHelper {

    private final OauthOidcHelper oauthOidcHelper;
    private final GoogleOauthClient googleOauthClient;

    @Value("${oauth2.provider.google.issuer}")
    private String googleOidcIssuer;

    @Value("${oauth2.provider.google.audience}")
    private String googleOidcAudience;

    public OidcDecodePayload getOidcDecodePayload(String token) {
        OidcPublicKeysResponse oidcPublicKeysResponse = googleOauthClient.getGoogleOidcPublicKeys();
        return oauthOidcHelper.getPayloadFromIdToken(token, googleOidcIssuer, googleOidcAudience, oidcPublicKeysResponse);
    }
}
