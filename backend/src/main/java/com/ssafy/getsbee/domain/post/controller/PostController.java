package com.ssafy.getsbee.domain.post.controller;

import com.ssafy.getsbee.domain.post.dto.request.PostListRequest;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.LikePostResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import com.ssafy.getsbee.domain.post.service.PostService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping("/{post-id}")
    public PostResponse showPostInfo(@PathVariable("post-id") Long postId){
        return postService.showPostInfo(postId, SecurityUtil.getCurrentMemberId());
    }

    @PatchMapping("/{post-id}")
    public void updatePost(@PathVariable("post-id") Long postId, @RequestBody @Valid UpdatePostRequest updatePostRequest) {
        postService.updatePost(postId, updatePostRequest, SecurityUtil.getCurrentMemberId());
    }

    @DeleteMapping("/{post-id}")
    public void deletePost(@PathVariable("post-id") Long postId) {
        postService.deletePost(postId, SecurityUtil.getCurrentMemberId());
    }

    @PostMapping("/{post-id}/bookmarks")
    public void addBookmark(@PathVariable("post-id") Long postId) {
        postService.addBookmark(postId, SecurityUtil.getCurrentMemberId());
    }

    @DeleteMapping("/{post-id}/bookmarks")
    public void deleteBookmark(@PathVariable("post-id") Long postId) {
        postService.deleteBookmark(postId, SecurityUtil.getCurrentMemberId());
    }

    @PostMapping("/{post-id}/likes")
    public LikePostResponse likePost(@PathVariable("post-id") Long postId){
        return postService.likePost(postId, SecurityUtil.getCurrentMemberId());
    }

    @DeleteMapping("/{post-id}/likes")
    public LikePostResponse unlikePost(@PathVariable("post-id") Long postId){
        return postService.unlikePost(postId, SecurityUtil.getCurrentMemberId());
    }

    @GetMapping("/")
    public Slice<PostListResponse> showPostList(PostListRequest postListRequest, Long cursor, Pageable pageable){
        return postService.showPostList(postListRequest, cursor, pageable);
    }
}
