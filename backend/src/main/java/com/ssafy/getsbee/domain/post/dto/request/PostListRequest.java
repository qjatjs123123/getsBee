package com.ssafy.getsbee.domain.post.dto.request;

import lombok.Builder;

public record PostListRequest (
        Long directoryId,
        Long memberId,
        String query,
        Boolean following,
        Long cursor
){
    @Builder
    public PostListRequest{
    }
}
