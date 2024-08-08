package com.ssafy.getsbee.domain.post.dto.response;

import com.ssafy.getsbee.domain.comment.dto.response.CommentResponse;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import lombok.Builder;

import java.util.List;

public record PostURLResponse(
        Long postId,
        String title,
        String url,
        String note,
        String thumbnailUrl,
        Boolean isPublic,
        Long viewCount,
        Long likeCount,
        Long bookmarkCount,
        String memberImage,
        Long directoryId,
        String directoryName,
        List<CommentResponse> comments,
        List<HighlightResponse> highlights,
        Boolean isLike,
        Boolean isBookmark,
        Boolean isMyPost,
        Long memberId,
        String memberName,
        String memberEmail
) {
    @Builder
    public PostURLResponse{}

    public static PostURLResponse from(Post post, List<HighlightResponse> highlights,
                                       List<CommentResponse> comments, Boolean isMyPost, Boolean isLike, Boolean isBookmark) {
        return PostURLResponse.builder()
                .postId(post.getId())
                .title(post.getTitle())
                .url(post.getUrl())
                .note(post.getNote())
                .thumbnailUrl(post.getThumbnailUrl())
                .isPublic(post.getIsPublic())
                .viewCount(post.getViewCount())
                .likeCount(post.getLikeCount())
                .bookmarkCount(post.getBookmarkCount())
                .memberImage(post.getMember().getPicture())
                .directoryId(post.getDirectory().getId())
                .directoryName(post.getDirectory().getName())
                .comments(comments)
                .highlights(highlights)
                .isLike(isLike)
                .isBookmark(isBookmark)
                .isMyPost(isMyPost)
                .memberId(post.getMember().getId())
                .memberName(post.getMember().getName())
                .memberEmail(post.getMember().getEmail())
                .build();
    }
}
