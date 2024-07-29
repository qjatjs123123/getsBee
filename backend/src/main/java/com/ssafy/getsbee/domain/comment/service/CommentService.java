package com.ssafy.getsbee.domain.comment.service;

import com.ssafy.getsbee.domain.comment.entity.Comment;

import java.util.List;

public interface CommentService {

    List<Comment> findCommentListByPostId(Long postId);

    Comment addComment(Long postId, Long memberId, String content);

    void deleteComment(Long commentId);
}
