package com.ssafy.getsbee.block.service;

import com.ssafy.getsbee.block.dto.request.BlockRequest;
import com.ssafy.getsbee.block.dto.response.BlockResponse;

import java.util.List;

public interface BlockService {

    List<BlockResponse> showBlockList(Long memberId);
    List<BlockResponse> addBlock(BlockRequest request, Long memberId);
    List<BlockResponse> deleteBlock(Long blockId, Long memberId);
}
