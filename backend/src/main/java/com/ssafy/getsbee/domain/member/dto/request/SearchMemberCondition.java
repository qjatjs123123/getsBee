package com.ssafy.getsbee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;

public record SearchMemberCondition(
        @NotNull
        String emailPrefix
) {
}
