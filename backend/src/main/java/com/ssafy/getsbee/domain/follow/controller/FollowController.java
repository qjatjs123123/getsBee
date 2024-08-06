package com.ssafy.getsbee.domain.follow.controller;

import com.ssafy.getsbee.domain.follow.dto.response.FollowDirectoryResponse;
import com.ssafy.getsbee.domain.follow.dto.response.HiveInfoResponse;
import com.ssafy.getsbee.domain.follow.service.FollowService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/follows")
public class FollowController {
    private final FollowService followService;

    @PostMapping("/directories/{directoryId}")
    public void followDirectory(@PathVariable("directoryId") Long directoryId) { followService.createFollow(directoryId); }

    @DeleteMapping("/{followId}")
    public void unfollowDirectory(@PathVariable("followId") Long followId) {
        followService.deleteFollow(followId);
    }

    @GetMapping("/follower/me")
    public List<FollowDirectoryResponse> getMyFollowers() {
        return followService.findFollowedDirectories(SecurityUtil.getCurrentMemberId());
    }

    @GetMapping("/follower/members/{memberId}")
    public List<FollowDirectoryResponse> getMemberFollowers(@PathVariable("memberId")Long memberId) {
        return followService.findFollowedDirectories(memberId);
    }

    @GetMapping("/following/me")
    public List<FollowDirectoryResponse> getFollowing() {
        return followService.findFollowingDirectories(SecurityUtil.getCurrentMemberId());
    }

    @GetMapping("/follower/members/{memberId}")
    public List<FollowDirectoryResponse> getMemberFollowing(@PathVariable("memberId")Long memberId) {
        return followService.findFollowingDirectories(memberId);
    }

    @GetMapping("/info")
    public HiveInfoResponse getHiveInfo(){ return followService.getHiveInfo(); }
}
