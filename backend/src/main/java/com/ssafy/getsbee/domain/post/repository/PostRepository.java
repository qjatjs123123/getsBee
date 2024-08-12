package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long>, PostRepositoryCustom {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<Post> findByMemberAndUrl(Member member, String url);

    Optional<Post> findById(Long postId);

    Long countPostsByMember(Member member);

    Long countPostsByDirectory(Directory directory);

    Optional<Post> findAllByMemberAndUrl(Member member, String url);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.url = :url AND p.isDeleted = false")
    Integer countPostsByUrl(@Param("url") String url);
}
