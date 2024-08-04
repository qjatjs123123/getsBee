package com.ssafy.getsbee.block.controller;

import com.ssafy.getsbee.block.dto.request.BlockRequest;
import com.ssafy.getsbee.block.dto.response.BlockResponse;
import com.ssafy.getsbee.block.service.BlockService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public List<BlockResponse> addBlock(@Valid @RequestBody BlockRequest request) {
        return blockService.addBlock(request, SecurityUtil.getCurrentMemberId());
    }
}
