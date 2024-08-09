package com.ssafy.getsbee.domain.member.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.member.dto.request.SearchMemberCondition;
import com.ssafy.getsbee.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.getsbee.domain.member.entity.QMember.*;

@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {

    private final JPAQueryFactory queryFactory;

     public List<Member> search(SearchMemberCondition condition) {
        return queryFactory
                .selectFrom(member)
                .where(emailPrefix(condition.emailPrefix()))
                .fetch();
    }

    private BooleanExpression emailPrefix(String emailPrefix) {
        return emailPrefix == null ? null : Expressions.stringTemplate("function('SUBSTRING_INDEX', {0}, '@', 1)", member.email)
                .eq(emailPrefix);
    }
}
