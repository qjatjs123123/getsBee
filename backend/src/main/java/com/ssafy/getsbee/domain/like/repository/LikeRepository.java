package com.ssafy.getsbee.domain.like.repository;

import com.ssafy.getsbee.domain.like.entity.Like;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Optional<Like> findByMemberAndPost(Member member, Post post);
}
