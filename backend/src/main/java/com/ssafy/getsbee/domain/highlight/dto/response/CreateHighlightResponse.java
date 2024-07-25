package com.ssafy.getsbee.domain.highlight.dto.response;

import lombok.Builder;

public record CreateHighlightResponse(
        Long highlightId
) {
    @Builder
    public CreateHighlightResponse{}

    public static CreateHighlightResponse of(Long highlightId) {
        return CreateHighlightResponse.builder().highlightId(highlightId).build();
    }

}
