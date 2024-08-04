package com.ssafy.getsbee.block.service;

import com.ssafy.getsbee.block.dto.request.BlockRequest;
import com.ssafy.getsbee.block.dto.response.BlockResponse;
import com.ssafy.getsbee.block.repository.BlockRepository;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BlockServiceImpl implements BlockService {

    private final MemberService memberService;
    private final BlockRepository blockRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BlockResponse> showBlockList(Long memberId) {
        return getBlockResponseList(memberId);
    }

    @Override
    public List<BlockResponse> addBlock(BlockRequest request, Long memberId) {
        blockRepository.save(request.toEntity(memberService.findById(memberId)));
        return getBlockResponseList(memberId);
    }

    private List<BlockResponse> getBlockResponseList(Long memberId) {
        return blockRepository.findAllByMember(memberService.findById(memberId)).stream()
                .map(BlockResponse::of)
                .toList();
    }
}
