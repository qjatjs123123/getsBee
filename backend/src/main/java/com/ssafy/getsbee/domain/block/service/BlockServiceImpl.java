package com.ssafy.getsbee.domain.block.service;

import com.ssafy.getsbee.domain.block.dto.request.BlockRequest;
import com.ssafy.getsbee.domain.block.dto.response.BlockResponse;
import com.ssafy.getsbee.domain.block.entity.Block;
import com.ssafy.getsbee.domain.block.repository.BlockRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
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
    @Transactional
    public List<BlockResponse> addBlock(BlockRequest request, Long memberId) {
        Member member = memberService.findById(memberId);
        if (blockRepository.existsByMemberAndDomain(member, request.domain())) {
            throw new BadRequestException(DUPLICATE_BLOCK);
        }
        blockRepository.save(request.toEntity(member));
        return getBlockResponseList(member.getId());
    }

    @Override
    @Transactional
    public List<BlockResponse> deleteBlock(Long blockId, Long memberId) {
        Block block = findBlockById(blockId);
        validateMember(block.getMember().getId(), memberId);
        blockRepository.delete(block);
        return getBlockResponseList(memberId);
    }

    private List<BlockResponse> getBlockResponseList(Long memberId) {
        return blockRepository.findAllByMember(memberService.findById(memberId)).stream()
                .map(BlockResponse::of)
                .toList();
    }

    private Block findBlockById(Long blockId) {
        return blockRepository.findById(blockId)
                .orElseThrow(() -> new BadRequestException(BLOCK_NOT_FOUND));
    }

    private void validateMember(Long blockMemberId, Long requestMemberId) {
        if (!Objects.equals(blockMemberId, requestMemberId)) {
            throw new ForbiddenException(FORBIDDEN_USER);
        }
    }
}
