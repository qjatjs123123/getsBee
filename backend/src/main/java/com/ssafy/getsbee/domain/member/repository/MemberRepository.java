package com.ssafy.getsbee.domain.member.repository;

import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByProviderAndEmail(Provider provider, String email);
}
