package com.ssafy.getsbee.domain.follow.dto.response;

import lombok.Builder;

public record FollowDirectoryResponse(
        Directory directory,
        Member member,
        Follow follow
) {
    @Builder
    public FollowDirectoryResponse{
    }

    public record Directory(
            Long directoryId,
            String directoryName
    ) {
        @Builder
        public Directory{
        }
    }

    public record Member(
            Long memberId,
            String memberEmail,
            String picture
    ) {
        @Builder
        public Member{
        }
    }

    public record Follow(
            Long followId
    ) {
        @Builder
        public Follow{
        }
    }
    public static FollowDirectoryResponse from(com.ssafy.getsbee.domain.follow.entity.Follow follow,
                                               com.ssafy.getsbee.domain.member.entity.Member member,
                                               String fullDirectoryName) {
        return FollowDirectoryResponse.builder()
                .directory(FollowDirectoryResponse.Directory.builder()
                        .directoryId(follow.getFollowedDirectory().getId())
                        .directoryName(fullDirectoryName)
                        .build())
                .member(FollowDirectoryResponse.Member.builder()
                        .memberId(member.getId())
                        .memberEmail(member.getEmail())
                        .picture(member.getPicture())
                        .build())
                .follow(FollowDirectoryResponse.Follow.builder()
                        .followId(follow.getId())
                        .build())
                .build();
    }
}
