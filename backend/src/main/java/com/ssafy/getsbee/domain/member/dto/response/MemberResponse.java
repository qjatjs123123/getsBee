package com.ssafy.getsbee.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.member.entity.Member;
import lombok.Builder;

import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.*;

public record MemberResponse(
        Long memberId,
        @JsonInclude(NON_NULL)
        String email,
        @JsonInclude(NON_NULL)
        String name,
        @JsonInclude(NON_NULL)
        String picture,
        @JsonInclude(NON_NULL)
        Integer birthYear,
        @JsonInclude(NON_NULL)
        List<Category> category
) {
    @Builder
    public MemberResponse {
    }

    public static MemberResponse of(Member member, List<Category> categories) {
        return MemberResponse.builder()
                .memberId(member.getId())
                .birthYear(member.getBirthYear())
                .category(categories)
                .build();
    }

    public static MemberResponse of(Member member) {
        return MemberResponse.builder()
                .memberId(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .picture(member.getPicture())
                .build();
    }
}
