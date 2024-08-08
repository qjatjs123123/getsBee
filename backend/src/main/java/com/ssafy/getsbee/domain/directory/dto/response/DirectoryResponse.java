package com.ssafy.getsbee.domain.directory.dto.response;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import lombok.Builder;

import java.util.ArrayList;
import java.util.List;

public record DirectoryResponse (
        Long directoryId,
        String name,
        Integer depth,
        Long prevDirectoryId,
        Long nextDirectoryId,
        Long parentDirectoryId,
        Long memberId,
        String memberName,
        List<DirectoryResponse> children
) {

    @Builder
    public DirectoryResponse{
    }

    public static DirectoryResponse fromEntity(Directory directory) {
        return new DirectoryResponse(
                directory.getId(),
                directory.getName(),
                directory.getDepth(),
                directory.getPrevDirectory() != null ? directory.getPrevDirectory().getId() : null,
                directory.getNextDirectory() != null ? directory.getNextDirectory().getId() : null,
                directory.getParentDirectory() != null ? directory.getParentDirectory().getId() : null,
                directory.getMember().getId(),
                directory.getMember().getName(),
                new ArrayList<>()
        );
    }
}
