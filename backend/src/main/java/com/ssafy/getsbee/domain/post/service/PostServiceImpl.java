package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.bookmark.entity.Bookmark;
import com.ssafy.getsbee.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
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
    private final HighlightRepository highlightRepository;

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

        Directory directory = directoryRepository.findDirectoryById(request.directoryId());

        // 하이라이트 삭제
        highlightRepository.deleteAll(request.deleteHighlightIds().stream()
                .map(highlightId -> highlightRepository.findById(highlightId).orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND)))
                .collect(Collectors.toList()));

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

        //좋아요 여부 필요
        Boolean isBookmark = bookmarkRepository.findByPostAndMember(post, member).isPresent();
        post.changeDirectory(directoryRepository.findTemporaryDirectoryByMember(member));

        post.increaseViewCount();
        return PostResponse.from(post, highlightResponses,
                !isNotOwner(post.getMember(), member), false, isBookmark);
    }

    @Override
    public void addBookmark(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        Bookmark bookmark = bookmarkRepository.findByPostAndMember(post, member)
                .orElseGet(() -> bookmarkRepository.save(new Bookmark(member, post,
                        directoryRepository.findBookmarkDirectoryByMember(member))));

        if (!bookmark.getIsDeleted()) {
            bookmark.changeBookmark();
        }
    }

    @Override
    public void deleteBookmark(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        Bookmark bookmark = bookmarkRepository.findByPostAndMember(post, member)
                .orElseThrow(() -> new BadRequestException(BOOKMARK_NOT_FOUND));
        bookmark.changeBookmark();
    }

    @Override
    public void likePost(Long postId, Long memberId) {

    }

    @Override
    public void unlikePost(Long postId, Long memberId) {

    }

    private Post findById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(POST_NOT_FOUND));
    }

    private Boolean isNotOwner(Member member, Member OwnerMember) {
        // 주소값이 다르기 때문에 equals 보다는 == 이 더 효율적임
        return member != OwnerMember;
    }
}