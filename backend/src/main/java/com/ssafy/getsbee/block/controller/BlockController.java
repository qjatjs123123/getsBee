package com.ssafy.getsbee.block.controller;

import com.ssafy.getsbee.block.dto.response.BlockResponse;
import com.ssafy.getsbee.block.service.BlockService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/blocks")
public class BlockController {

    private final BlockService blockService;

    @GetMapping
    public List<BlockResponse> showBlockList() {
        return blockService.showBlockList(SecurityUtil.getCurrentMemberId());
    }
}
