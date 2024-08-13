package com.ssafy.getsbee.domain.interest.repository;

import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InterestRepository extends JpaRepository<Interest, Long> {

    List<Interest> findAllByMember(Member member);
    List<Interest> findByUrl(String url);
    Boolean existsByUrl(String url);
}
