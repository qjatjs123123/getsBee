package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.ForbiddenException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class HighlightServiceImpl implements HighlightService {

    // 의존성 주입
    // 1. 생성자 주입 : @RequiredArgsConstructor 생성자 -> 한번 생성하면 그 뒤로 수정하지 않기 때문
    // 2. 필드 주입 : @Autowired 로 private final service 명시
    // 3. 수정자 주입 : setMemberService set 메서드로 주입
    private final HighlightRepository highlightRepository;
    private final MemberService memberService;
    private final PostRepository postRepository;

    @Override
    @Transactional
    public HighlightResponse addHighlight(CreateHighlightRequest request, Long memberId) {
        Member member = memberService.findById(memberId);

        Post post = postRepository.findByMemberAndUrl(member, request.url())
                        .orElseGet(()->{
                            // Directory directory = directoryService.findByMemberAndTemporary();
                            Directory directory = null;
                            return postRepository.save(request.toPostEntity(member, directory));
                        });

        //[추가기능] Type image면 s3 로직 추가 필요

        Highlight highlight = request.toHighlightEntity(post);
        highlightRepository.save(highlight);
        return HighlightResponse.of(highlight.getId());
    }

    @Override
    @Transactional
    public void deleteHighlight(Long highlightId, Long memberId) {
        Member member = memberService.findById(memberId);
        Highlight highlight = highlightRepository.findById(highlightId)
                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));

        if (highlight.getPost().getMember() != member) {
            throw new ForbiddenException(_FORBIDDEN);
        }
        Post post = highlight.getPost();
        highlightRepository.deleteById(highlightId);

        if(post.getHighlights().isEmpty() && post.getNote().isEmpty()){
            postRepository.delete(post);
        }
    }

    @Override
    public HighlightResponse updateHighlight(Long highlightId, UpdateHighlightRequest request) {
        Member member = memberService.findById(highlightId);
        Highlight highlight = highlightRepository.findById(highlightId)
                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));

        if(highlight.getPost().getMember() != member) {
            throw new ForbiddenException(_FORBIDDEN);
        }
        highlight.changeColor(request.color());
        return HighlightResponse.of(highlight.getId());
    }
}
