package com.ssafy.getsbee.domain.post.dto.request;

import jakarta.validation.constraints.NotNull;

public record KeywordRequest (
        @NotNull
        String keyword,

        @NotNull
        Integer pageNumber,

        @NotNull
        Integer pageSize
){}
