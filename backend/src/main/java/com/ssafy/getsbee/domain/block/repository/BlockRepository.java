package com.ssafy.getsbee.domain.block.repository;

import com.ssafy.getsbee.domain.block.entity.Block;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlockRepository extends JpaRepository<Block, Long> {

    List<Block> findAllByMember(Member member);
    Boolean existsByMemberAndDomain(Member member, String domain);
}
