package com.ssafy.getsbee.domain.highlight.controller;

import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.HighlightsRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.service.HighlightService;
import com.ssafy.getsbee.domain.post.service.PostService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/highlights")
@RequiredArgsConstructor
public class HighlightController {
    private final HighlightService highlightService;
    private final PostService postService;

    @PostMapping
    public HighlightResponse createHighlight(@RequestBody @Valid CreateHighlightRequest createHighlightRequest) {
        return highlightService.addHighlight(createHighlightRequest, SecurityUtil.getCurrentMemberId());
    }

    @DeleteMapping("/{highlight-id}")
    public void deleteHighlight(@PathVariable("highlight-id") Long highlightId) {
        highlightService.deleteHighlight(highlightId, SecurityUtil.getCurrentMemberId());
    }

    @PatchMapping("/{highlight-id}")
    public void updateHighlight(@PathVariable("highlight-id") Long highlightId,
                                                   @RequestBody @Valid UpdateHighlightRequest updateHighlightRequest){
        highlightService.updateHighlight(highlightId, updateHighlightRequest, SecurityUtil.getCurrentMemberId());
    }


    @PostMapping("/list")
    public List<HighlightResponse> getHighlights(@RequestBody @Valid HighlightsRequest highlightsRequest){
        return highlightService.getHighlights(highlightsRequest.url(), SecurityUtil.getCurrentMemberId());
    }
}
