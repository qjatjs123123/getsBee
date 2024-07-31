package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.post.dto.request.PostListRequest;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import org.springframework.data.domain.Page;
import java.util.List;

public interface PostService {

    void deletePost(Long postId, Long memberId);

    void updatePost(Long postId, UpdatePostRequest request, Long memberId);

    PostResponse showPostInfo(Long postId, Long memberId);

    void addBookmark(Long postId, Long memberId);

    void deleteBookmark(Long postId, Long memberId);

    void likePost(Long postId, Long memberId);

    void unlikePost(Long postId, Long memberId);

    Page<PostListResponse> showPostList(PostListRequest postListRequest);
}
