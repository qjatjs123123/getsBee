package com.ssafy.getsbee.domain.directory.dto.request;

import jakarta.validation.constraints.NotNull;

public record DirectoryRequest (
        @NotNull
        String directoryId,
        @NotNull
        String name,
        @NotNull
        Integer depth,
        String prevDirectoryId,
        String nextDirectoryId,
        String parentDirectoryId,
        @NotNull
        Long memberId
) {
}
