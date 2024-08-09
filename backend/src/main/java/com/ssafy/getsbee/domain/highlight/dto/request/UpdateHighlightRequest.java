package com.ssafy.getsbee.domain.highlight.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateHighlightRequest(
        @NotNull
        String color
) {
}
