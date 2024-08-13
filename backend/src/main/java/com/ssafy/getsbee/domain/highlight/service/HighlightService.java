package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.highlight.dto.request.*;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.dto.response.S3UrlResponse;

import java.util.List;

public interface HighlightService {

    HighlightResponse addHighlight(CreateHighlightRequest createHighlightRequest, Long MemberId);

    void deleteHighlight(Long highlightId, DeleteHighlightRequest deleteHighlightRequest, Long MemberId);

    void updateHighlight(Long highlightId, UpdateHighlightRequest updateHighlightRequest, Long memberId);

    List<HighlightResponse> getHighlights(String url, Long memberId);

    void updateHighlightsIndex(List<UpdateIndexHighlight> updateIndexHighlights, Long memberId);

    S3UrlResponse showBodyFromUrlAndMemberId(HighlightsRequest highlightsRequest);
}
