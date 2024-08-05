package com.ssafy.getsbee.block.dto.request;

import com.ssafy.getsbee.block.entity.Block;
import com.ssafy.getsbee.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;

public record BlockRequest(
        @NotNull
        String domain
) {
    public Block toEntity(Member member) {
        return Block.builder()
                .domain(domain)
                .isDeleted(false)
                .member(member)
                .build();
    }
}
