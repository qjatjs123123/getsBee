package com.ssafy.getsbee.domain.directory.dto.response;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.global.util.SecurityUtil;

public record DirectoryInfoResponse(
        String memberEmail,
        Long postCount,
        Integer depth,
        String directoryName,
        String parentDirectoryName,
        Long parentDirectoryId,
        Boolean Follow,
        Boolean isMyDirectory
) {

    public static DirectoryInfoResponse from(Member member, Directory directory, Long postCount, Boolean isFollow) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        return new DirectoryInfoResponse(
                member.getEmail(),
                postCount,
                directory.getDepth(),
                directory.getName(),
                directory.getDepth() == 2 ? directory.getParentDirectory().getName() : null,
                directory.getDepth() == 2 ? directory.getParentDirectory().getId() : null,
                isFollow,
                currentMemberId.equals(directory.getMember().getId())
        );
    }
}
