package com.ssafy.getsbee.domain.follow.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long>, FollowRepositoryCustom {

    @Query("SELECT f FROM Follow f WHERE f.followingMember.id = :memberId")
    List<Follow> findFollowingByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT f FROM Follow f WHERE f.followedMember.id = :memberId")
    List<Follow> findFollowedByMemberId(@Param("memberId") Long memberId);

    Optional<Follow> findByFollowingMemberAndFollowedDirectory(Member member, Directory directory);
}

