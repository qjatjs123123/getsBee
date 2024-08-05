package com.ssafy.getsbee.domain.block.dto.response;

import com.ssafy.getsbee.domain.block.entity.Block;

public record BlockResponse(
        Long blockId,
        String domain
) {

    public static BlockResponse of(Block block) {
        return new BlockResponse(block.getId(), block.getDomain());
    }
}
