package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.response.OidcDecodePayload;
import com.ssafy.getsbee.domain.auth.dto.response.OidcPublicKey;
import com.ssafy.getsbee.domain.auth.dto.response.OidcPublicKeysResponse;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
@RequiredArgsConstructor
public class OauthOidcHelper {

    private final JwtOidcProvider jwtOidcProvider;

    public OidcDecodePayload getPayloadFromIdToken(String token, String iss, String aud,
                                                   OidcPublicKeysResponse oidcPublicKeysResponse) {
        String kid = getKidFromUnsignedIdToken(token, iss, aud);
        OidcPublicKey oidcPublicKey =
                oidcPublicKeysResponse.keys().stream()
                        .filter(o -> o.kid().equals(kid))
                        .findFirst()
                        .orElseThrow(() -> new BadRequestException(INVALID_ID_TOKEN));
        return jwtOidcProvider.getOidcTokenBody(token, oidcPublicKey.n(), oidcPublicKey.e());
    }

    private String getKidFromUnsignedIdToken(String token, String iss, String aud) {
        return jwtOidcProvider.getKidFromUnsignedTokenHeader(token, iss, aud);
    }
}
