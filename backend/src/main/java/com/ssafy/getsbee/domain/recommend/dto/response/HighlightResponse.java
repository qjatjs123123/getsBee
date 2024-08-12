package com.ssafy.getsbee.domain.recommend.dto.response;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;

import java.util.List;

public record HighlightResponse(
        List<String> highlightColors,
        Integer highlightNumber
) {

    public static HighlightResponse of(List<Highlight> highlights) {
        return new HighlightResponse(getHighlightColors(highlights), highlights.size());
    }

    private static List<String> getHighlightColors(List<Highlight> highlights) {
        return highlights.stream()
                .map(Highlight::getColor)
                .distinct()
                .toList();
    }
}