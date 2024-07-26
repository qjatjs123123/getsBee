package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberService memberService; // 순환 참조
    private final DirectoryRepository directoryRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    @Transactional
    public void deletePost(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        if (isNotOwner(post.getMember(), member)) {
            throw new BadRequestException(_FORBIDDEN);
        }
        postRepository.delete(post);
    }

    @Override
    @Transactional
    public void updatePost(Long postId, UpdatePostRequest request, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        if (isNotOwner(post.getMember(), member)) {
            throw new BadRequestException(_FORBIDDEN);
        }

        // Directory directory = directoryRepository.findById(request.directoryId());
        Directory directory = null;

        post.updatePost(request.note(), directory, request.isPublic());
        postRepository.save(post);
    }

    @Override
    @Transactional
    public PostResponse showPostInfo(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        if (!post.getIsPublic() && isNotOwner(post.getMember(), member)) {
            throw new BadRequestException(_UNAUTHORIZED);
        }

        List<HighlightResponse> highlightResponses = post.getHighlights()
                .stream()
                .map(HighlightResponse::of).collect(Collectors.toList());

        // 북마크 좋아요 여부 필요, 디렉토리 저장 필요
        // Boolean isBookmark = bookmarkRepository.findByIdMemberAndPost()

        post.increaseViewCount();
        return PostResponse.from(post, highlightResponses,
                !isNotOwner(post.getMember(), member), false, false);
    }

    private Post findById(Long postId){
        return postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(POST_NOT_FOUND));
    }

    private Boolean isNotOwner(Member member, Member OwnerMember) {
        // 주소값이 다르기 때문에 equals 보다는 == 이 더 효율적임
        return member != OwnerMember;
    }
}
