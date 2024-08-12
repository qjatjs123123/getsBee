package com.ssafy.getsbee.domain.recommend.dto.response;

public record DirectoryResponse(
        Long directoryId,
        String directoryName
) {

    public static DirectoryResponse of(Long directoryId, String directoryName) {
        return new DirectoryResponse(directoryId, directoryName);
    }
}