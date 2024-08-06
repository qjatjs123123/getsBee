package com.ssafy.getsbee.domain.post.dto.response;

import com.ssafy.getsbee.domain.comment.dto.response.CommentResponse;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
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

        Long directoryId,
        String directoryName,

        List<CommentResponse> comments,
        List<HighlightResponse> highlights,

        Boolean isLike,
        Boolean isBookmark,
        Boolean isMyPost
) {
    @Builder
    public PostResponse{}

    public static PostResponse from(Post post, List<HighlightResponse> highlights,
                                    List<CommentResponse> comments, Boolean isMyPost, Boolean isLike, Boolean isBookmark) {
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
                .directoryId(post.getDirectory().getId())
                .directoryName(post.getDirectory().getName())
                .comments(comments)
                .highlights(highlights)
                .isLike(isLike)
                .isBookmark(isBookmark)
                .isMyPost(isMyPost)
                .build();
    }
}
