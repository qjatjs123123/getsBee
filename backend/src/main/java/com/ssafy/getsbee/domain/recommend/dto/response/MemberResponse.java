package com.ssafy.getsbee.domain.recommend.dto.response;

import com.ssafy.getsbee.domain.member.entity.Member;
import lombok.Builder;

public record MemberResponse(
        Long memberId,
        String memberName,
        String memberPicture,
        String memberEmail
) {

    @Builder
    public MemberResponse {
    }

    public static MemberResponse of(final Member member) {
        return MemberResponse.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .memberPicture(member.getPicture())
                .memberEmail(member.getEmail())
                .build();
    }
}
