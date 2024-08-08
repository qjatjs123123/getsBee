package com.ssafy.getsbee.domain.interest.repository;

import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterestRepository extends JpaRepository<Interest, Long> {

    List<Interest> findAllByMember(Member member);
    Boolean existsByUrl(String url);
}
