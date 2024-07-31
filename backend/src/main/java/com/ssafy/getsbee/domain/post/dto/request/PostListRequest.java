package com.ssafy.getsbee.domain.post.dto.request;

public record PostListRequest (
        Long directoryId,
        String memberId,
        String query,
        Boolean following
){
}
