package com.ssafy.getsbee.domain.member.service;

import com.ssafy.getsbee.domain.member.dto.request.MemberRequest;
import com.ssafy.getsbee.domain.member.dto.response.MemberResponse;
import com.ssafy.getsbee.domain.member.entity.Member;

public interface MemberService {

    Member findById(Long memberId);
    MemberResponse showMemberInfo(Long memberId);
    void addMemberInterest(MemberRequest request, Long memberId);
}
