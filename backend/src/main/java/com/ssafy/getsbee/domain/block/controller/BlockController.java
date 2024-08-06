package com.ssafy.getsbee.domain.block.controller;

import com.ssafy.getsbee.domain.block.dto.request.BlockRequest;
import com.ssafy.getsbee.domain.block.dto.response.BlockResponse;
import com.ssafy.getsbee.domain.block.service.BlockService;
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

    @DeleteMapping("/{block-id}")
    public List<BlockResponse> deleteBlock(@PathVariable("block-id") Long blockId) {
        return blockService.deleteBlock(blockId, SecurityUtil.getCurrentMemberId());
    }
}
