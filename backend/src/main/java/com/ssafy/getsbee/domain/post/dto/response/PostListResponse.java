package com.ssafy.getsbee.domain.post.dto.response;

import lombok.Builder;
import org.hibernate.Hibernate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    public static PostListResponse from(
            com.ssafy.getsbee.domain.post.entity.Post post,
            List<com.ssafy.getsbee.domain.highlight.entity.Highlight> highlights,
            Boolean isLikedByCurrentUser,
            Boolean isBookmarkedByCurrentUser,
            Integer relatedFeedNumber
    ) {
        // 강제로 프록시 객체를 초기화하여 문제를 방지
        com.ssafy.getsbee.domain.member.entity.Member member = post.getMember();
        com.ssafy.getsbee.domain.directory.entity.Directory directory = post.getDirectory();

        // 강제로 초기화
        Hibernate.initialize(directory);

        List<String> highlightColors = highlights.stream()
                .map(com.ssafy.getsbee.domain.highlight.entity.Highlight::getColor)
                .distinct()
                .collect(Collectors.toList());

        return PostListResponse.builder()
                .post(Post.builder()
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
                        .build())
                .member(Member.builder()
                        .memberId(member.getId())
                        .memberName(member.getName())
                        .memberPicture(member.getPicture())
                        .memberEmail(member.getEmail())
                        .build())
                .directory(Directory.builder()
                        .directoryId(directory.getId())
                        .directoryName(directory.getName())
                        .build())
                .highlight(Highlight.builder()
                        .highlightColors(highlightColors)
                        .highlightNumber(highlights.size())
                        .firstHighlightColor(highlightColors.isEmpty() ? null : highlightColors.get(0))
                        .firstHighlightContent(highlights.isEmpty() ? null : highlights.get(0).getContent())
                        .build())
                .info(Info.builder()
                        .isLikedByCurrentUser(isLikedByCurrentUser)
                        .isBookmarkedByCurrentUser(isBookmarkedByCurrentUser)
                        .relatedFeedNumber(relatedFeedNumber)
                        .build())
                .build();
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
            String memberPicture,
            String memberEmail
    ) {
        @Builder
        public Member(Long memberId, String memberName, String memberPicture, String memberEmail) {
            this.memberId = memberId;
            this.memberName = memberName;
            this.memberPicture = memberPicture;
            this.memberEmail = memberEmail;
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