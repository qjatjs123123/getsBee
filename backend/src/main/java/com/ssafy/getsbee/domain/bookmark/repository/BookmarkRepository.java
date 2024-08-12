package com.ssafy.getsbee.domain.bookmark.repository;

import com.ssafy.getsbee.domain.bookmark.entity.Bookmark;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {


    Optional<Bookmark> findByPostAndMember(Post post, Member member);
}
