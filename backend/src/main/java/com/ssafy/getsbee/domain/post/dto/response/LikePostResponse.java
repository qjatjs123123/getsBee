package com.ssafy.getsbee.domain.post.dto.response;

import com.ssafy.getsbee.domain.post.entity.Post;

public record LikePostResponse(
        Long postId,
        Long likeCount
) {
    public static LikePostResponse of(Post post) {
        return new LikePostResponse(post.getId(), post.getLikeCount());
    }
}
