package com.ssafy.getsbee.domain.follow.dto.response;

import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;


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
            String directoryName,
            Long postCount
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
            Long followId,
            Long followCount
    ) {
        @Builder
        public Follow{
        }
    }




    public static FollowDirectoryResponse from(com.ssafy.getsbee.domain.follow.entity.Follow follow,
                                               com.ssafy.getsbee.domain.member.entity.Member member,
                                               String fullDirectoryName, Long postCounts, Long followCount ) {


        return FollowDirectoryResponse.builder()
                .directory(FollowDirectoryResponse.Directory.builder()
                        .directoryId(follow.getFollowedDirectory().getId())
                        .directoryName(fullDirectoryName)
                        .postCount(postCounts)
                        .build())
                .member(FollowDirectoryResponse.Member.builder()
                        .memberId(member.getId())
                        .memberEmail(member.getEmail())
                        .picture(member.getPicture())
                        .build())
                .follow(FollowDirectoryResponse.Follow.builder()
                        .followId(follow.getId())
                        .followCount(followCount)
                        .build())
                .build();
    }
}
