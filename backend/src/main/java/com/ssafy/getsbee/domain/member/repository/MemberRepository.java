package com.ssafy.getsbee.domain.member.repository;

import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
