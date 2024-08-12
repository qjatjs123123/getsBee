package com.ssafy.getsbee.domain.bookmark.repository;

import com.ssafy.getsbee.domain.bookmark.entity.Bookmark;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {


    Optional<Bookmark> findByPostAndMember(Post post, Member member);

    @Query("SELECT b.post FROM Bookmark b WHERE b.member = :member AND b.id < :cursor")
    Slice<Post> findAllPostByMember(@Param("member") Member member, @Param("cursor") Long cursor, Pageable pageable);

}
