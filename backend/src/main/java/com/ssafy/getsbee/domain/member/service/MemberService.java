package com.ssafy.getsbee.domain.member.service;

import com.ssafy.getsbee.domain.member.entity.Member;

public interface MemberService {

    Member findById(Long memberId);
}
