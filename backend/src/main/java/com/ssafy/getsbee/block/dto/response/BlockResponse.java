package com.ssafy.getsbee.block.dto.response;

import com.ssafy.getsbee.block.entity.Block;

public record BlockResponse(
        Long blockId,
        String domain
) {

    public static BlockResponse of(Block block) {
        return new BlockResponse(block.getId(), block.getDomain());
    }
}
