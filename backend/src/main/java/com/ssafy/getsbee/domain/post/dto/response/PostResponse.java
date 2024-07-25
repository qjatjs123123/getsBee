package com.ssafy.getsbee.domain.post.dto.response;

import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;
import lombok.Builder;

import java.util.List;

public record PostResponse(
        Long postId,
        String title,
        String url,
        String note,
        String thumbnailUrl,
        Boolean isPublic,
        Long viewCount,
        Long likeCount,
        Long bookmarkCount,
        String directoryName,

        // 댓글
        // 하이라이트
        List<HighlightResponse> highlights,

        // 좋아요 여부
        Boolean isLike,
        // 북마크 여부
        Boolean isBookmark,

        // 내가 만든 포스트 인지 여부
        Boolean isMyPost
) {
    @Builder
    public PostResponse{}

    public static PostResponse from(Post post, List<HighlightResponse> highlights,
                                    Boolean isMyPost, Boolean isLike, Boolean isBookmark) {
        return PostResponse.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .url(post.getUrl())
                .note(post.getNote())
                .thumbnailUrl(post.getThumbnailUrl())
                .isPublic(post.getIsPublic())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .bookmarkCount(post.getBookmarkCount())
                .directoryName(post.getDirectory().getName())
                .highlights(highlights)
                .isLike(isLike)
                .isBookmark(isBookmark)
                .isMyPost(isMyPost)
                .build();
    }
}
