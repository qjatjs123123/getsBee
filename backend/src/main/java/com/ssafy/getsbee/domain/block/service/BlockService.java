package com.ssafy.getsbee.domain.block.service;

import com.ssafy.getsbee.domain.block.dto.request.BlockRequest;
import com.ssafy.getsbee.domain.block.dto.response.BlockResponse;

import java.util.List;

public interface BlockService {

    List<BlockResponse> showBlockList(Long memberId);
    List<BlockResponse> addBlock(BlockRequest request, Long memberId);
    List<BlockResponse> deleteBlock(Long blockId, Long memberId);
}
