package com.ssafy.getsbee.block.service;

import com.ssafy.getsbee.block.dto.request.BlockRequest;
import com.ssafy.getsbee.block.dto.response.BlockResponse;
import com.ssafy.getsbee.block.entity.Block;
import com.ssafy.getsbee.block.repository.BlockRepository;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.ForbiddenException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

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

    @Override
    public List<BlockResponse> deleteBlock(Long blockId, Long memberId) {
        Block block = blockRepository.findById(blockId)
                .orElseThrow(() -> new BadRequestException(BLOCK_NOT_FOUND));
        if (!Objects.equals(block.getMember().getId(), memberId)) {
            throw new ForbiddenException(FORBIDDEN_USER);
        }
        blockRepository.delete(block);
        return getBlockResponseList(memberId);
    }

    private List<BlockResponse> getBlockResponseList(Long memberId) {
        return blockRepository.findAllByMember(memberService.findById(memberId)).stream()
                .map(BlockResponse::of)
                .toList();
    }
}
