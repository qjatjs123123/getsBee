package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {

    Optional<Post> findByMemberAndUrl(Member member, String url);

    Optional<Post> findById(Long postId);

    List<Post> findAllByDirectoryId(Long directoryId);
}
