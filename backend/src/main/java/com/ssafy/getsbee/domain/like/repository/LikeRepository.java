package com.ssafy.getsbee.domain.like.repository;

import com.ssafy.getsbee.domain.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
}
