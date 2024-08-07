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

    @GetMapping("/follower/members/me")
    public List<FollowDirectoryResponse> getMyFollowers() {
        return followService.findFollowedDirectories(SecurityUtil.getCurrentMemberId());
    }

    @GetMapping("/follower/members/{memberId}")
    public List<FollowDirectoryResponse> getMemberFollowers(@PathVariable("memberId") Long memberId) {
        return followService.findFollowedDirectories(memberId);
    }

    @GetMapping("/following/members/me")
    public List<FollowDirectoryResponse> getMyFollowing() {
        return followService.findFollowingDirectories(SecurityUtil.getCurrentMemberId());
    }

    @GetMapping("/following/members/{memberId}")
    public List<FollowDirectoryResponse> getMemberFollowing(@PathVariable("memberId") Long memberId) {
        return followService.findFollowingDirectories(memberId);
    }

    @GetMapping("/hiveInfo/members/{memberId}")
    public HiveInfoResponse getMemberHiveInfo(@PathVariable("memberId")Long memberId){ return followService.getHiveInfo(memberId); }

    @GetMapping("/hiveInfo/members/me")
    public HiveInfoResponse getMyHiveInfo(){ return followService.getHiveInfo(SecurityUtil.getCurrentMemberId()); }
}
