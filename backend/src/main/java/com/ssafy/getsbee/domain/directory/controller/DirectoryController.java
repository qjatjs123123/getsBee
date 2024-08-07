package com.ssafy.getsbee.domain.directory.controller;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.dto.response.DirectorySearchResponse;
import com.ssafy.getsbee.domain.directory.service.DirectoryElasticServiceImpl;
import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/directories")
public class DirectoryController {

    private final DirectoryService directoryService;
    private final MemberService memberService;
    private final DirectoryElasticServiceImpl directoryElasticServiceImpl;

    @GetMapping("")
    public List<DirectoryResponse> getDirectories(@RequestParam("memberId") Long memberId) {
        Member member = memberService.findById(memberId);
        return directoryService.findAllByMember(member);
    }

    @PostMapping("")
    public List<DirectoryResponse> modifyDirectories(@RequestParam Long memberId, @RequestBody List<DirectoryRequest> directoryRequests) {
        return directoryService.modifyDirectories(directoryRequests);
    }

    @GetMapping("/search")
    public Slice<DirectorySearchResponse> getDirectoriesBySearch(@RequestParam String query, Pageable pageable, Long cursor) {
        return directoryService.showDirectoriesBySearch(query, pageable, cursor);
    }
}
