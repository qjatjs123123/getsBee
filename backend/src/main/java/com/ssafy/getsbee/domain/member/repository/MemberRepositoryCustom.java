package com.ssafy.getsbee.domain.member.repository;

import com.ssafy.getsbee.domain.member.dto.request.SearchMemberCondition;
import com.ssafy.getsbee.domain.member.entity.Member;

import java.util.List;

public interface MemberRepositoryCustom {

    List<Member> search(SearchMemberCondition condition);
}
