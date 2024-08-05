package com.ssafy.getsbee.domain.post.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;

public record PostListResponse (
        Post post,
        Member member,
        Directory directory,
        Highlight highlight,
        Info info
) {
    @Builder
    public PostListResponse{
    }

    public record Post(
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
        public Post(Long postId, String title, String url, String thumbnail, String note, Boolean isPublic,
                    Long viewCount, Long likeCount, Long bookmarkCount, LocalDateTime createdAt) {
            this.postId = postId;
            this.title = title;
            this.url = url;
            this.thumbnail = thumbnail;
            this.note = note;
            this.isPublic = isPublic;
            this.viewCount = viewCount;
            this.likeCount = likeCount;
            this.bookmarkCount = bookmarkCount;
            this.createdAt = createdAt;
        }
    }
    public record Member(
            Long memberId,
            String memberName,
            String memberPicture
    ) {
        @Builder
        public Member(Long memberId, String memberName, String memberPicture) {
            this.memberId = memberId;
            this.memberName = memberName;
            this.memberPicture = memberPicture;
        }
    }
    public record Directory(
            Long directoryId,
            String directoryName
    ) {
        @Builder
        public Directory(Long directoryId, String directoryName) {
            this.directoryId = directoryId;
            this.directoryName = directoryName;
        }
    }
    public record Highlight(
            List<String> highlightColors,
            Integer highlightNumber,
            String firstHighlightColor,
            String firstHighlightContent
    ) {
        @Builder
        public Highlight(List<String> highlightColors, Integer highlightNumber, String firstHighlightColor,
                         String firstHighlightContent) {
            this.highlightColors = highlightColors;
            this.highlightNumber = highlightNumber;
            this.firstHighlightColor = firstHighlightColor;
            this.firstHighlightContent = firstHighlightContent;
        }
    }
    public record Info(
            Boolean isLikedByCurrentUser,
            Boolean isBookmarkedByCurrentUser,
            Integer relatedFeedNumber
    ) {
        @Builder
        public Info(Boolean isLikedByCurrentUser, Boolean isBookmarkedByCurrentUser, Integer relatedFeedNumber) {
            this.isLikedByCurrentUser = isLikedByCurrentUser;
            this.isBookmarkedByCurrentUser = isBookmarkedByCurrentUser;
            this.relatedFeedNumber = relatedFeedNumber;
        }
    }
}
