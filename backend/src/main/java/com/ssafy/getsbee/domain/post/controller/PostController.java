package com.ssafy.getsbee.domain.post.controller;

import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import com.ssafy.getsbee.domain.post.service.PostService;
import com.ssafy.getsbee.global.security.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/bookmark/{post-id}")
    public void addBookmark(@PathVariable("post-id") Long postId) {
        postService.addBookmark(postId, SecurityUtil.getCurrentMemberId());
    }

    @DeleteMapping("/bookmark/{post-id}")
    public void deleteBookmark(@PathVariable("post-id") Long postId) {
        postService.deleteBookmark(postId, SecurityUtil.getCurrentMemberId());
    }
}
