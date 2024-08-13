package com.ssafy.getsbee.domain.highlight.controller;

import com.ssafy.getsbee.domain.highlight.dto.request.*;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.dto.response.S3UrlResponse;
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

    @PostMapping
    public HighlightResponse createHighlight(@RequestBody @Valid CreateHighlightRequest createHighlightRequest) {
        return highlightService.addHighlight(createHighlightRequest, SecurityUtil.getCurrentMemberId());
    }

    @PostMapping("/{highlight-id}/delete")
    public S3UrlResponse deleteHighlight(@PathVariable("highlight-id") Long highlightId,
                                @RequestBody @Valid DeleteHighlightRequest deleteHighlightRequest) {
        return highlightService.deleteHighlight(highlightId, deleteHighlightRequest, SecurityUtil.getCurrentMemberId());
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

    @PatchMapping("/update")
    public void updateHighlightsIndex(@RequestBody @Valid List<UpdateIndexHighlight> updateIndexHighlights){
        highlightService.updateHighlightsIndex(updateIndexHighlights, SecurityUtil.getCurrentMemberId());
    }

    @PostMapping("/body")
    public S3UrlResponse showBodyFromUrlAndMemberId(@RequestBody @Valid HighlightsRequest highlightsRequest){
        return highlightService.showBodyFromUrlAndMemberId(highlightsRequest);
    }

    @PatchMapping("/body")
    public S3UrlResponse modifyBodyContent(@RequestBody @Valid modifyHighlightBodyResponse modifyHighlightBodyResponse){
        return highlightService.modifyHighlightBody(modifyHighlightBodyResponse);
    }
}
