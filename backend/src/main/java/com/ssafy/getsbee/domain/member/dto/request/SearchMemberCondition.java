package com.ssafy.getsbee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;

public record SearchMemberCondition(
        @NotNull
        String emailPrefix
) {

    public static SearchMemberCondition of(String emailPrefix) {
        return new SearchMemberCondition(emailPrefix);
    }
}
