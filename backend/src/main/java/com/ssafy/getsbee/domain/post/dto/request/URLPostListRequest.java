package com.ssafy.getsbee.domain.post.dto.request;

public record URLPostListRequest(
        String url,
        Long cursor,
        int page,
        int size
) {
}
