package com.ssafy.getsbee.domain.follow.dto.response;

import lombok.Builder;

public record HiveInfoResponse(
        Long following,
        Long follower,
        Long postNumber
) {
    @Builder
    public HiveInfoResponse {
    }
}
