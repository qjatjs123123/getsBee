package com.ssafy.getsbee.domain.directory.dto.response;


import lombok.Builder;

public record DirectorySearchResponse(
        Directory directory,
        Member member,
        Follow follow
) {
    @Builder
    public DirectorySearchResponse{
    }

    public record Directory(
            Long directoryId,
            String directoryName,
            Long postNumber
    ){
        @Builder
        public Directory{
        }
    }
    public record Member(
            Long memberId,
            String memberName,
            String memberPicture,
            String memberEmail
    ){
        @Builder
        public Member{
        }
    }
    public record Follow(
            Long followId,
            Long followCount,
            Boolean isFollowedByCurrentUser
    ){
        @Builder
        public Follow{
        }
    }
}
