package com.ssafy.getsbee.domain.directory.dto.response;

import java.util.List;

public record DirectoryResponse (
        Long directoryId,
        String name,
        Integer depth,
        Long prevDirectoryId,
        Long nextDirectoryId,
        Long parentDirectoryId,
        Long memberId,
        List<DirectoryResponse> children
) {
}
