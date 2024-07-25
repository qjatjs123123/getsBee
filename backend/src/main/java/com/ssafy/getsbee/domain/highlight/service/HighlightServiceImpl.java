package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.response.CreateHighlightResponse;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.domain.post.service.PostService;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class HighlightServiceImpl implements HighlightService {

    private final HighlightRepository highlightRepository;
    private final MemberService memberService;
    private final PostService postService;
    private final PostRepository postRepository;

    @Override
    public CreateHighlightResponse addHighlight(CreateHighlightRequest request, Long memberId) {
        Member member = memberService.findById(memberId);

        Post post = postRepository.findByMemberAndUrl(member, request.url())
                        .orElseGet(()->{
                            // Directory directory = directoryService.findByMemberAndTemporary();
                            Directory directory = null;

                            // test 필요
                            return postRepository.save(request.toPostEntity(member, directory));
                        });

        // Type image면 s3 로직 추가 필요

        Highlight highlight = request.toHighlightEntity(post);
        highlightRepository.save(highlight);
        return CreateHighlightResponse.of(highlight.getId());
    }

    @Override
    public void deleteHighlight(Long highlightId, Long memberId) {
        Member member = memberService.findById(memberId);
        Highlight highlight = highlightRepository.findById(highlightId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.HIGHLIGHT_NOT_FOUND));

        if (!highlight.getPost().getMember().equals(member)) {
            throw new BadRequestException(ErrorCode._FORBIDDEN);
        }
        highlightRepository.deleteById(highlightId);
    }
}
