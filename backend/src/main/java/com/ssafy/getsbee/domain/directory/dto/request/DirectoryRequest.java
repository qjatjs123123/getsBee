package com.ssafy.getsbee.domain.directory.dto.request;

import java.util.List;

public record DirectoryRequest (
        String directoryId,
        String name,
        Integer depth,
        String prevDirectoryId,
        String nextDirectoryId,
        String parentDirectoryId,
        Long memberId
) {
}
