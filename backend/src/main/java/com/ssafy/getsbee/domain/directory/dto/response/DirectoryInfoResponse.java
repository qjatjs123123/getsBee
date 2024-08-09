package com.ssafy.getsbee.domain.directory.dto.response;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.global.util.SecurityUtil;

public record DirectoryInfoResponse(
        String memberEmail,
        Long postCount,
        Integer depth,
        String parentDirectoryName,
        Long parentDirectoryId,
        Boolean Follow,
        Boolean isMyDirectory
) {

    public static DirectoryInfoResponse from(Member member, Directory directory, Long postCount, Boolean isFollow) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        return new DirectoryInfoResponse(
                member.getEmail(),                             // memberEmail
                postCount,                                     // postCount
                directory.getDepth(),                          // depth
                directory.getDepth() == 2 ? directory.getParentDirectory().getName() : null,  // parentDirectoryName
                directory.getDepth() == 2 ? directory.getParentDirectory().getId() : null,    // parentDirectoryId
                isFollow,                                      // Follow
                currentMemberId.equals(directory.getMember().getId())                   // isMyDirectory
        );
    }
}
