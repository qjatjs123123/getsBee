package com.ssafy.getsbee.domain.recommend.service;

import com.ssafy.getsbee.domain.recommend.dto.response.RecommendResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface RecommendService {

    Slice<RecommendResponse> recommendPersonalizePosts(Long memberId, Pageable pageable);
    Slice<RecommendResponse> recommendRelatedPosts(Long postId, Pageable pageable);
}
