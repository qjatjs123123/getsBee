package com.ssafy.getsbee.domain.auth.dto.request;

import com.ssafy.getsbee.domain.member.entity.Provider;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
        @NotNull
        Provider provider,
        @NotNull
        String idToken
) {
}
