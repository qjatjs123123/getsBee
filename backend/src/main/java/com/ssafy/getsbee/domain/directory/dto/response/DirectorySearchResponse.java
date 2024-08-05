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
            Long DirectoryId,
            String DirectoryName,
            Long postNumber
    ){
        @Builder
        public Directory{
        }
    }
    public record Member(
            Long memberId,
            String memberName,
            String memberPicture
    ){
        @Builder
        public Member{
        }
    }
    public record Follow(
            Long followCount,
            Boolean isFollowedByCurrentUser
    ){
        @Builder
        public Follow{
        }
    }
}
