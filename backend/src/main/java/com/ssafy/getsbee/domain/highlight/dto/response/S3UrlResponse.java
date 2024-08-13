package com.ssafy.getsbee.domain.highlight.dto.response;

import lombok.Builder;

public record S3UrlResponse(
        String url
) {
    @Builder
    public S3UrlResponse{
    }

    public static S3UrlResponse from(String url){
        return S3UrlResponse.builder().url(url).build();
    }
}
