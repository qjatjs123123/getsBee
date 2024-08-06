package com.ssafy.getsbee.domain.comment.dto.request;

import lombok.Builder;

public record AddCommentRequest(
        String content,
        Long post_id
) {
    @Builder
    public AddCommentRequest {
    }
}
