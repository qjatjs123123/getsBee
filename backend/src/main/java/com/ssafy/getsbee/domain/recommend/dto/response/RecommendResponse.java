package com.ssafy.getsbee.domain.recommend.dto.response;

import lombok.Builder;

public record RecommendResponse(
    PostResponse post,
    MemberResponse member,
    DirectoryResponse directory,
    HighlightResponse highlight
) {

    @Builder
    public RecommendResponse {
    }

    public static RecommendResponse of(PostResponse post, MemberResponse member, DirectoryResponse directory, HighlightResponse highlight) {
        return RecommendResponse.builder()
                .post(post)
                .member(member)
                .directory(directory)
                .highlight(highlight)
                .build();
    }
}
