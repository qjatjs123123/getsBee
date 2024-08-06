package com.ssafy.getsbee.domain.comment.dto.response;

import com.ssafy.getsbee.domain.comment.entity.Comment;
import com.ssafy.getsbee.domain.member.entity.Member;
import lombok.Builder;

import java.time.LocalDateTime;

public record CommentResponse(
    Long commentId,
    String content,
    Long memberId,
    String memberName,
    LocalDateTime createdAt,
    Boolean isMyComment
) {
    @Builder
    public CommentResponse(Long commentId, String content, Long memberId, String memberName, LocalDateTime createdAt, Boolean isMyComment) {
        this.commentId = commentId;
        this.content = content;
        this.memberId = memberId;
        this.memberName = memberName;
        this.createdAt = createdAt;
        this.isMyComment = isMyComment;
    }

    public static CommentResponse of(Comment comment, Member member) {
        return CommentResponse.builder()
                .commentId(comment.getId())
                .content(comment.getContent())
                .memberId(comment.getMember().getId())
                .memberName(comment.getMember().getName())
                .createdAt(comment.getCreatedAt())
                .isMyComment(member == comment.getMember())
                .build();
    }
}
