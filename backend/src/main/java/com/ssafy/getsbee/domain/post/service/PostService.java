package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.post.dto.request.PostListRequest;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.LikePostResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.parameters.P;

public interface PostService {

    void deletePost(Long postId, Long memberId);

    void updatePost(Long postId, UpdatePostRequest request, Long memberId);

    PostResponse showPostInfo(Long postId, Long memberId);

    void addBookmark(Long postId, Long memberId);

    void deleteBookmark(Long postId, Long memberId);

    LikePostResponse likePost(Long postId, Long memberId);

    LikePostResponse unlikePost(Long postId, Long memberId);

    Slice<PostListResponse> showPostList(PostListRequest postListRequest, Long cursor, Pageable pageable);

    Slice<PostResponse> showPostListByUrl(String url, Long cursor, Pageable pageable);
}
