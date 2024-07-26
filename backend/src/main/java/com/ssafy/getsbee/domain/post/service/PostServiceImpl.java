package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final DirectoryRepository directoryRepository;
    private final BookmarkRepository bookmarkRepository;

    private final Boolean MYPOST = true;
    private final Boolean NOTMYPOST = false;

    @Override
    public void deletePost(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findValidPost(postId);

        if (!post.getMember().equals(member)) {
            throw new BadRequestException(ErrorCode._FORBIDDEN);
        }
        postRepository.delete(post);
    }

    @Override
    public void updatePost(Long postId, UpdatePostRequest request, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findValidPost(postId);

        // Directory directory = directoryRepository.findById(request.directoryId());
        Directory directory = null;

        if (!post.getMember().equals(member)) {
            throw new BadRequestException(ErrorCode._FORBIDDEN);
        }

        post.updatePost(request.note(), directory, request.isPublic());
        postRepository.save(post);
    }

    @Override
    public PostResponse showPostInfo(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findValidPost(postId);

        List<HighlightResponse> highlightResponses = post.getHighlights()
                .stream()
                .filter(highlight -> !highlight.getIsDeleted())
                .map(HighlightResponse::of).collect(Collectors.toList());

        if (!post.getIsPublic() && !post.getMember().equals(member)) {
            throw new BadRequestException(ErrorCode._UNAUTHORIZED);
        }

        // 북마크 좋아요 여부 필요, 디렉토리 저장 필요
        // Boolean isBookmark = bookmarkRepository.findByIdMemberAndPost()

        post.increaseViewCount();
        return PostResponse.from(post, highlightResponses,
                isOwner(post.getMember(), member) ? MYPOST : NOTMYPOST, false, false);
    }

    private Post findValidPost(Long postId){
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(ErrorCode.POST_NOT_FOUND));

        if(post.getIsDeleted()) throw new BadRequestException(ErrorCode.POST_NOT_FOUND);
        return post;
    }

    private Boolean isOwner(Member member, Member OwnerMember) {
        return member.equals(OwnerMember);
    }
}
