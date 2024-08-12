package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.HighlightsRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateIndexHighlight;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;

import java.util.List;

public interface HighlightService {

    HighlightResponse addHighlight(CreateHighlightRequest createHighlightRequest, Long MemberId);

    void deleteHighlight(Long highlightId, Long MemberId);

    void updateHighlight(Long highlightId, UpdateHighlightRequest updateHighlightRequest, Long memberId);

    List<HighlightResponse> getHighlights(String url, Long memberId);

    void updateHighlightsIndex(List<UpdateIndexHighlight> updateIndexHighlights, Long memberId);

    String showBodyFromUrlAndMemberId(HighlightsRequest highlightsRequest);
}
