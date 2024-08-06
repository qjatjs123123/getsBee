package com.ssafy.getsbee.domain.comment.controller;

import com.ssafy.getsbee.domain.comment.dto.request.AddCommentRequest;
import com.ssafy.getsbee.domain.comment.service.CommentService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    void addComment(@RequestBody AddCommentRequest addCommentRequest) {
        commentService.addComment(addCommentRequest.post_id(), SecurityUtil.getCurrentMemberId(), addCommentRequest.content());
    }

    @DeleteMapping("/{comment_id}")
    void deleteComment(@PathVariable("comment_id") Long comment_id){
        commentService.deleteComment(comment_id);
    }
}
