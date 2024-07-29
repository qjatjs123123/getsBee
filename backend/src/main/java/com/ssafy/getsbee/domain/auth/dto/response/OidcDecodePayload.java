package com.ssafy.getsbee.domain.auth.dto.response;

import com.ssafy.getsbee.domain.member.entity.Authority;
import com.ssafy.getsbee.domain.member.entity.Member;
import io.jsonwebtoken.Claims;
import lombok.Builder;

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
                .email(payload.get("email", String.class))
                .name(payload.get("name", String.class))
                .picture(payload.get("picture", String.class))
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .email(email)
                .profile(picture)
                .name(name)
                .authority(Authority.ROLE_USER)
                .isDeleted(false)
                .build();
    }
}
