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
}
