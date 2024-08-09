package com.ssafy.getsbee.domain.member.controller;

import com.ssafy.getsbee.domain.member.dto.request.MemberRequest;
import com.ssafy.getsbee.domain.member.dto.request.SearchMemberCondition;
import com.ssafy.getsbee.domain.member.dto.response.MemberResponse;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping
    public MemberResponse showMemberInfo() {
        return memberService.showMemberRecommendInfo(SecurityUtil.getCurrentMemberId());
    }

    @PatchMapping
    public void updateMemberInfo(@RequestBody MemberRequest request) {
        memberService.addMemberInterest(request, SecurityUtil.getCurrentMemberId());
    }

    @GetMapping("/{member-id}")
    public MemberResponse showMemberInfo(@PathVariable("member-id") Long memberId) {
        return memberService.showMemberInfo(memberId);
    }

    @GetMapping("/search")
    public MemberResponse searchMember(@Valid SearchMemberCondition condition) {
        return memberService.searchMember(condition);
    }
}
