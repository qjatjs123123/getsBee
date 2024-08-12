package com.ssafy.getsbee.domain.recommend.dto.response;

import com.ssafy.getsbee.domain.post.entity.Post;
import lombok.Builder;

import java.time.LocalDateTime;

public record PostResponse(
        Long postId,
        String title,
        String url,
        String thumbnail,
        String note,
        Boolean isPublic,
        Long viewCount,
        Long likeCount,
        Long bookmarkCount,
        LocalDateTime createdAt
) {

    @Builder
    public PostResponse {
    }

    public static PostResponse of(final Post post) {
        return PostResponse.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .url(post.getUrl())
                .thumbnail(post.getThumbnailUrl())
                .note(post.getNote())
                .isPublic(post.getIsPublic())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .bookmarkCount(post.getBookmarkCount())
                .createdAt(post.getCreatedAt())
                .build();
    }
}
