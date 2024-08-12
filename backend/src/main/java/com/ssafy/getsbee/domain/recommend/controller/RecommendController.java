package com.ssafy.getsbee.domain.recommend.controller;

import com.ssafy.getsbee.domain.recommend.dto.response.RecommendResponse;
import com.ssafy.getsbee.domain.recommend.service.RecommendService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommends")
public class RecommendController {

    private final RecommendService recommendService;

    @GetMapping
    public Slice<RecommendResponse> showPersonalizedPosts(Pageable pageable) {
        return recommendService.recommendPersonalizePosts(SecurityUtil.getCurrentMemberId(), pageable);
    }

    @GetMapping("/posts/{post-id}")
    public Slice<RecommendResponse> showRelatedPosts(@PathVariable("post-id") Long postId, Pageable pageable) {
        return recommendService.recommendRelatedPosts(postId, pageable);
    }
}
