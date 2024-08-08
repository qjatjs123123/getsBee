package com.ssafy.getsbee.domain.member.service;

import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.member.dto.request.MemberRequest;
import com.ssafy.getsbee.domain.member.dto.response.MemberResponse;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final InterestRepository interestRepository;

    @Override
    @Transactional(readOnly = true)
    public Member findById(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(MEMBER_NOT_FOUND));
    }

    @Override
    @Transactional(readOnly = true)
    public MemberResponse showMemberRecommendInfo(Long memberId) {
        Member member = findById(memberId);
        return MemberResponse.of(member, transferToCategory(interestRepository.findAllByMember(member)));
    }

    @Override
    @Transactional
    public void addMemberInterest(MemberRequest request, Long memberId) {
        Member member = findById(memberId);
        List<Interest> interests = interestRepository.findAllByMember(member);
        if (!interests.isEmpty()) {
            throw new BadRequestException(DUPLICATE_INTEREST);
        }
        member.updateInfo(request.birthYear());
        interestRepository.saveAll(transferToInterests(request.category(), member));
    }

    @Override
    @Transactional(readOnly = true)
    public MemberResponse showMemberInfo(Long memberId) {
        return MemberResponse.of(findById(memberId));
    }

    private List<Interest> transferToInterests(List<Category> categories, Member member) {
        return categories.stream()
                .map(category -> Interest.of(member, category))
                .toList();
    }

    private List<Category> transferToCategory(List<Interest> interests) {
        return interests.stream()
                .map(Interest::getCategory)
                .toList();
    }
}
