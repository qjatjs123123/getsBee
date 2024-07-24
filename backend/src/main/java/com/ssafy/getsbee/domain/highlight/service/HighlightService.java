package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;

public interface HighlightService {

    void addHighlight(CreateHighlightRequest createHighlightRequest, Long MemberId);

    void removeHighlight(Highlight highlight);
}
