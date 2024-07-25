package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.response.CreateHighlightResponse;

public interface HighlightService {

    CreateHighlightResponse addHighlight(CreateHighlightRequest createHighlightRequest, Long MemberId);

    void deleteHighlight(Long highlightId, Long MemberId);
}
