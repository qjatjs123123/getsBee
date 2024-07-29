package com.ssafy.getsbee.domain.auth.dto.response;

import com.ssafy.getsbee.domain.member.entity.Authority;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import io.jsonwebtoken.Claims;
import lombok.Builder;

import static com.ssafy.getsbee.global.consts.StaticConst.*;

public record OidcDecodePayload(
        String aud,
        String sub,
        String email,
        String name,
        String picture
) {

    @Builder
    public OidcDecodePayload {
    }

    public static OidcDecodePayload of(Claims payload) {
        return OidcDecodePayload.builder()
                .aud(payload.getAudience().toString())
                .sub(payload.getSubject())
                .email(payload.get(CLAIM_EMAIL, String.class))
                .name(payload.get(CLAIM_NAME, String.class))
                .picture(payload.get(CLAIM_PICTURE, String.class))
                .build();
    }

    public Member toEntity(Provider provider) {
        return Member.builder()
                .email(email)
                .picture(picture)
                .name(name)
                .provider(provider)
                .authority(Authority.ROLE_USER)
                .isDeleted(false)
                .build();
    }
}
