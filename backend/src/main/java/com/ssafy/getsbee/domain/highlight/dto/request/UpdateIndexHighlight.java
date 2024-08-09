package com.ssafy.getsbee.domain.highlight.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateIndexHighlight(
        @NotNull
        Long highlightId,
        @NotNull
        String startIndex,
        @NotNull
        Integer startOffset,
        @NotNull
        String lastIndex,
        @NotNull
        Integer lastOffset
) {
}
