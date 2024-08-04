package com.ssafy.getsbee.block.service;

import com.ssafy.getsbee.block.dto.response.BlockResponse;

import java.util.List;

public interface BlockService {

    List<BlockResponse> showBlockList(Long memberId);
}
