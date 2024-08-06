package com.ssafy.getsbee.domain.member.dto.response;

import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.member.entity.Member;

import java.util.List;

public record MemberResponse(
        Long memberId,
        Integer birthYear,
        List<Category> category
) {
    public static MemberResponse of(Member member, List<Category> categories) {
        return new MemberResponse(member.getId(), member.getBirthYear(), categories);
    }
}
