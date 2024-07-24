package com.ssafy.getsbee.domain.directory.dto.request;

import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;

import java.util.List;

public record DirectoryRequest (
        Long directoryId,
        String name,
        int depth,
        Long prevDirectoryId,
        Long nextDirectoryId,
        Long parentDirectoryId,
        Long memberId,
        List<DirectoryResponse> children
) {
}
