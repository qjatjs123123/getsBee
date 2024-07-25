package com.ssafy.getsbee.domain.highlight.dto.response;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.Type;
import lombok.Builder;

public record HighlightResponse(
        Long highlightId,
        String content,
        String color,
        Integer startIndex,
        Integer startOffset,
        Integer lastIndex,
        Integer lastOffset,
        Type type
) {
    @Builder
    public HighlightResponse{}

    public static HighlightResponse of(Highlight highlight) {
        return new HighlightResponse(
                highlight.getId(),
                highlight.getContent(),
                highlight.getColor(),
                highlight.getStartIndex(),
                highlight.getStartOffset(),
                highlight.getLastIndex(),
                highlight.getLastOffset(),
                highlight.getType()
        );
    }
}
