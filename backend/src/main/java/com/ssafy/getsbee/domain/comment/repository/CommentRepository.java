package com.ssafy.getsbee.domain.comment.repository;

import com.ssafy.getsbee.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
