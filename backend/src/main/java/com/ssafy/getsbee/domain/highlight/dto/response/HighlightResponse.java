package com.ssafy.getsbee.domain.highlight.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.HighlightLog;
import com.ssafy.getsbee.domain.highlight.entity.Type;
import lombok.Builder;

public record HighlightResponse(
        Long highlightId,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String content,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String color,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String startIndex,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Integer startOffset,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        String lastIndex,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Integer lastOffset,
        @JsonInclude(JsonInclude.Include.NON_NULL)
        Type type
//        @JsonInclude(JsonInclude.Include.NON_NULL)
//        Boolean is_deleted

) {
    @Builder
    public HighlightResponse{}

    public static HighlightResponse of(Long highlightId) {
        return HighlightResponse.builder()
                .highlightId(highlightId)
                .build();
    }

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
//                highlight.getIsDeleted()
        );
    }

//    public static HighlightResponse of(HighlightLog highlight) {
//        return new HighlightResponse(
//                highlight.getId(),
//                highlight.getContent(),
//                highlight.getColor(),
//                highlight.getStartIndex(),
//                highlight.getStartOffset(),
//                highlight.getLastIndex(),
//                highlight.getLastOffset(),
//                highlight.getType(),
//                highlight.getIsDeleted()
//        );
//    }
}
