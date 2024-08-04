package com.ssafy.getsbee.block.service;

import com.ssafy.getsbee.block.dto.response.BlockResponse;
import com.ssafy.getsbee.block.repository.BlockRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockServiceImpl implements BlockService {

    private final MemberService memberService;
    private final BlockRepository blockRepository;

    @Override
    public List<BlockResponse> showBlockList(Long memberId) {
        return blockRepository.findAllByMember(memberService.findById(memberId)).stream()
                .map(BlockResponse::of)
                .toList();
    }
}
