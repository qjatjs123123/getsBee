package com.ssafy.getsbee.domain.directory.controller;

import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/directories")
public class DirectoryController {

    private final DirectoryService directoryService;
    private final MemberService memberService;

    @GetMapping("")
    public List<DirectoryResponse> getDirectories(@RequestParam Long memberId) {
        System.out.println("directories");
        Member member = memberService.findById(memberId);
        return directoryService.findAllByMember(member);
    }
}
