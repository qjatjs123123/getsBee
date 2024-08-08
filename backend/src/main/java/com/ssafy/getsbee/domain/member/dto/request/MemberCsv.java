package com.ssafy.getsbee.domain.member.dto.request;

public record MemberCsv(
        String memberId,
        String age,
        String category
) {

    public MemberCsv of(String memberId, String age, String category) {
        return new MemberCsv(memberId, age, category);
    }
}
