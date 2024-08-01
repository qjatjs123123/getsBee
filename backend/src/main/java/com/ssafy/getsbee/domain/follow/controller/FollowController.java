package com.ssafy.getsbee.domain.follow.controller;

import com.ssafy.getsbee.domain.follow.dto.response.FollowDirectoryResponse;
import com.ssafy.getsbee.domain.follow.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
public class FollowController {
    private final FollowService followService;

    @PostMapping("/directories/{directoryId}")
    public void followDirectory(@PathVariable("directoryId") Long directoryId) {
        followService.createFollow(directoryId);
    }

    @DeleteMapping("/{followId}")
    public void unfollowDirectory(@PathVariable("followId") Long followId) {
        followService.deleteFollow(followId);
    }

    @GetMapping("/follower")
    public List<FollowDirectoryResponse> getFollowers() {
        return followService.findFollowedDirectories();
    }

    @GetMapping("/following")
    public List<FollowDirectoryResponse> getFollowing() {
        return followService.findFollowingDirectories();
    }
}
