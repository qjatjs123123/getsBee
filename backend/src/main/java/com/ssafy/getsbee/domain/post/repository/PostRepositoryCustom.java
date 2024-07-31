package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PostRepositoryCustom {
    Page<Post> findAllByMemberId(Long memberId, Pageable pageable);
}
