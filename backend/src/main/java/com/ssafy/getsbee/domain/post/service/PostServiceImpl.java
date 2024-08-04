package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.bookmark.entity.Bookmark;
import com.ssafy.getsbee.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.dto.request.PostListRequest;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.NotFoundException;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
    private final FollowRepository followRepository;

    private static final Integer DEFAULT_PAGE_SIZE = 20;
    private final MemberRepository memberRepository;

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

    @Override
    public Slice<PostListResponse> showPostList(PostListRequest postListRequest, Long cursor, Pageable pageable) {

        if(postListRequest.directoryId() != null){
            return showPostListByDirectoryId(postListRequest.directoryId(), cursor, pageable);
        }else if(postListRequest.memberId() != null){
            return showPostListByMemberId(postListRequest.memberId(), cursor, pageable);
        }else if(postListRequest.following()!=null){
            return followingPostListByMemberId(SecurityUtil.getCurrentMemberId(), cursor, pageable);
        }else if(postListRequest.query()!=null){
            //다현이 검색 로직
        }else{
            throw new BadRequestException(INVALID_POST_REQUEST);
        }
        return null;
    }

    private Slice<PostListResponse> followingPostListByMemberId(Long memberId, Long cursor, Pageable pageable) {
        Member member = memberService.findById(memberId);
        List<Directory> directories = followRepository.findFollowingDirectories(member);
        Slice<Post> posts = postRepository.findAllByDirectories(directories, cursor, pageable);
        return makePostListResponseWithPosts(posts);
    }

    private Slice<PostListResponse> showPostListByMemberId(Long memberId, Long cursor, Pageable pageable) {
        Slice<Post> posts = postRepository.findAllByMemberId(memberId, cursor, pageable);
        return makePostListResponseWithPosts(posts);
    }

    private Slice<PostListResponse> showPostListByDirectoryId(Long directoryId, Long cursor, Pageable pageable) {
        Slice<Post> posts = postRepository.findAllByDirectoryId(directoryId, cursor, pageable);
        return makePostListResponseWithPosts(posts);
    }

    private Slice<PostListResponse> makePostListResponseWithPosts(Slice<Post> posts) {
        List<PostListResponse> postListResponses = posts.stream()
                .map(post -> {
                    List<Highlight> highlights = highlightRepository.findAllByPostId(post.getId()).orElse(new ArrayList<>());
                    List<String> highlightColors = highlights.stream()
                            .map(Highlight::getColor)
                            .collect(Collectors.toList());

                    Member member = post.getMember();
                    Directory directory = post.getDirectory();

                    PostListResponse.Post postInfo = PostListResponse.Post.builder()
                            .postId(post.getId())
                            .title(post.getTitle())
                            .url(post.getUrl())
                            .thumbnail(post.getThumbnailUrl())
                            .note(post.getNote())
                            .isPublic(post.getIsPublic())
                            .viewCount(post.getViewCount())
                            .likeCount(post.getLikeCount())
                            .bookmarkCount(post.getBookmarkCount())
                            .createdAt(post.getCreatedAt())
                            .build();

                    PostListResponse.Member memberInfo = PostListResponse.Member.builder()
                            .memberId(member.getId())
                            .memberName(member.getName())
                            .memberPicture(member.getPicture())
                            .build();

                    PostListResponse.Directory directoryInfo = PostListResponse.Directory.builder()
                            .directoryId(directory.getId())
                            .directoryName(directory.getName())
                            .build();

                    PostListResponse.Highlight highlightInfo = PostListResponse.Highlight.builder()
                            .highlightColors(highlightColors)
                            .highlightNumber(highlightColors.size())
                            .firstHighlightColor(highlightColors.isEmpty() ? null : highlightColors.get(0))
                            .firstHighlightContent(highlights.isEmpty() ? null : highlights.get(0).getContent())
                            .build();

                    PostListResponse.Info info = PostListResponse.Info.builder()
                            .isLikedByCurrentUser(false) // 구현 예정
                            .isBookmarkedByCurrentUser(checkIfBookmarkedByCurrentUser(post))
                            .relatedFeedNumber(null) // 구현 예정
                            .build();

                    return PostListResponse.builder()
                            .post(postInfo)
                            .member(memberInfo)
                            .directory(directoryInfo)
                            .highlight(highlightInfo)
                            .info(info)
                            .build();
                }).collect(Collectors.toList());

        return new SliceImpl<>(postListResponses, posts.getPageable(), posts.hasNext());
    }

    private boolean checkIfLikedByCurrentUser(Post post) {
        // 로직 구현 필요
        return false;
    }

    private boolean checkIfBookmarkedByCurrentUser(Post post) {
        Member currentMember = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

        return bookmarkRepository.findByPostAndMember(post, currentMember).isPresent();
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