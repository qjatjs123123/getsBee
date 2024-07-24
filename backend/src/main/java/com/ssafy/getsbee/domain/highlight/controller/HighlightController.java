package com.ssafy.getsbee.domain.highlight.controller;

import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.service.HighlightService;
import com.ssafy.getsbee.domain.post.service.PostService;
import com.ssafy.getsbee.domain.post.service.PostServiceImpl;
import com.ssafy.getsbee.global.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/highlights")
@RequiredArgsConstructor
@Slf4j
public class HighlightController {
    private final HighlightService highlightService;
    private final PostService postService;

    @PostMapping
    public void createHighlight(CreateHighlightRequest createHighlightRequest) {
        highlightService.addHighlight(createHighlightRequest, SecurityUtil.getCurrentMemberId());
    }
}
