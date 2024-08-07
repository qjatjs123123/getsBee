package com.ssafy.getsbee.domain.auth.dto.response;

import com.ssafy.getsbee.domain.block.dto.response.BlockResponse;

import java.util.List;

public record LoginResponse(
        TokenResponse token,
        List<BlockResponse> block
) {
    public static LoginResponse of(TokenResponse token, List<BlockResponse> block) {
        return new LoginResponse(token, block);
    }
}
