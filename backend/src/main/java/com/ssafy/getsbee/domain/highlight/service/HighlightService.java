package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;

public interface HighlightService {

    HighlightResponse addHighlight(CreateHighlightRequest createHighlightRequest, Long MemberId);

    void deleteHighlight(Long highlightId, Long MemberId);

    void updateHighlight(Long highlightId, UpdateHighlightRequest updateHighlightRequest);
}
