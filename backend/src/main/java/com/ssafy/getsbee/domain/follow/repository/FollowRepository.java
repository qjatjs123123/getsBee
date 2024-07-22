package com.ssafy.getsbee.domain.follow.repository;

import com.ssafy.getsbee.domain.follow.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowRepository extends JpaRepository<Follow, Long> {
}
