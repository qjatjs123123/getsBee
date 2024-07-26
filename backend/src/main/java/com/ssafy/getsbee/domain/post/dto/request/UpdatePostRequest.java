package com.ssafy.getsbee.domain.post.dto.request;

import jakarta.validation.constraints.NotNull;

import java.util.List;


public record UpdatePostRequest(
        String note,
        @NotNull
        Long directoryId,
        @NotNull
        Boolean isPublic,
        List<Long> deleteHighlightIds
) {
}
