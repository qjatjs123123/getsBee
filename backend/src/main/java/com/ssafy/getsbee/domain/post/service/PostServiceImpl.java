package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.bookmark.entity.Bookmark;
import com.ssafy.getsbee.domain.bookmark.repository.BookmarkRepository;
import com.ssafy.getsbee.domain.comment.dto.response.CommentResponse;
import com.ssafy.getsbee.domain.comment.repository.CommentRepository;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.domain.like.entity.Like;
import com.ssafy.getsbee.domain.like.repository.LikeRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.dto.request.PostListRequest;
import com.ssafy.getsbee.domain.post.dto.request.UpdatePostRequest;
import com.ssafy.getsbee.domain.post.dto.response.LikePostResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostResponse;
import com.ssafy.getsbee.domain.post.dto.response.PostURLResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.ForbiddenException;
import com.ssafy.getsbee.global.error.exception.NotFoundException;
import com.ssafy.getsbee.global.util.LogUtil;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.getsbee.global.common.model.Interaction.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final DirectoryRepository directoryRepository;
    private final BookmarkRepository bookmarkRepository;
    private final HighlightRepository highlightRepository;
    private final PostElasticService postElasticService;
    private final FollowRepository followRepository;
    private final LikeRepository likeRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void deletePost(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        if (isNotOwner(post.getMember(), member)) {
            throw new BadRequestException(_FORBIDDEN);
        }

        postElasticService.deletePostDocument(post);
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

        Directory directory = directoryRepository.findDirectoryById(request.directoryId()).orElseThrow(()->new BadRequestException(DIRECTORY_NOT_FOUND));

        // 하이라이트 삭제
        List<Highlight> list = new ArrayList<>();
        for (Long highlightId : request.deleteHighlightIds()) {
            Highlight highlight = highlightRepository.findById(highlightId).orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));
            list.add(highlight);
            post.deleteHighlight(highlight);
        }
        highlightRepository.deleteAll(list);

        post.updatePost(request.note(), directory, request.isPublic());

        postRepository.save(post);
        postElasticService.updatePostDocument(post);
    }

    @Override
    @Transactional
    public PostResponse showPostInfo(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        if (!post.getIsPublic() && isNotOwner(post.getMember(), member)) {
            throw new BadRequestException(_UNAUTHORIZED);
        }

        List<CommentResponse> commentResponseList = post.getComments().stream()
                .map(comment -> CommentResponse.of(comment, member))
                .collect(Collectors.toList());

        post.updateHighlights(highlightRepository.findAllByPost(post));

        List<HighlightResponse> highlightResponses = post.getHighlights()
                .stream()
                .map(HighlightResponse::of).collect(Collectors.toList());

        //좋아요 여부 필요
        Boolean isBookmark = bookmarkRepository.findByPostAndMember(post, member)
                .filter(bookmark -> !bookmark.getIsDeleted())
                .isPresent();

        Boolean isLike = likeRepository.existsByMemberAndPost(member, post);

        post.increaseViewCount();
        LogUtil.loggingInteraction(VIEW, post.getId());
        return PostResponse.from(post, highlightResponses,commentResponseList,
                !isNotOwner(post.getMember(), member), isLike, isBookmark);
    }

    @Override
    @Transactional
    public void addBookmark(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        Bookmark bookmark = bookmarkRepository.findByPostAndMember(post, member)
                .orElseGet(() -> bookmarkRepository.save(new Bookmark(member, post,
                        directoryRepository.findBookmarkDirectoryByMember(member))));

        if (!bookmark.getIsDeleted()) {
            bookmark.addBookmark();
            LogUtil.loggingInteraction(BOOKMARK, post.getId());
        }
    }

    @Override
    @Transactional
    public void deleteBookmark(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);

        Bookmark bookmark = bookmarkRepository.findByPostAndMember(post, member)
                .orElseThrow(() -> new BadRequestException(BOOKMARK_NOT_FOUND));
        bookmark.removeBookmark();
    }

    @Override
    @Transactional
    public LikePostResponse likePost(Long postId, Long memberId) {
        Post post = findById(postId);
        Member member = memberService.findById(memberId);
        if (likeRepository.findByMemberAndPost(member, post).isPresent()) {
           throw new BadRequestException(DUPLICATE_LIKE);
        }
        likeRepository.save(Like.of(member, post));
        post.increaseLikeCount();
        LogUtil.loggingInteraction(LIKE, post.getId());
        return LikePostResponse.of(post);
    }

    @Override
    @Transactional
    public LikePostResponse unlikePost(Long postId, Long memberId) {
        Member member = memberService.findById(memberId);
        Post post = findById(postId);
        Like like = likeRepository.findByMemberAndPost(member, post)
                .orElseThrow(() -> new BadRequestException(LIKE_NOT_FOUND));
        if (isNotOwner(member, like.getMember())) {
            throw new ForbiddenException(FORBIDDEN_USER);
        }
        likeRepository.delete(like);
        post.decreaseLikeCount();
        return LikePostResponse.of(post);
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<PostListResponse> showPostList(PostListRequest postListRequest, Long cursor, Pageable pageable) {
        if(cursor == null) cursor = Long.MAX_VALUE;

        if(postListRequest.directoryId() !=null && postListRequest.query() != null){
            return showPostListByDirectoryIdAndKeyword(postListRequest.directoryId(), postListRequest.query(), cursor, pageable);
        }
        if(postListRequest.directoryId() != null){
            return showPostListByDirectoryId(postListRequest.directoryId(), cursor, pageable);
        }
        if(postListRequest.memberId() != null){
            return showPostListByMemberId(postListRequest.memberId(), cursor, pageable);
        }
        if(postListRequest.following()!=null){
            return showFollowingPostListByMemberId(SecurityUtil.getCurrentMemberId(), cursor, pageable);
        }
        if(postListRequest.query()!=null){
            return showPostListByKeyword(postListRequest.query(), pageable, cursor);
        }
        throw new BadRequestException(INVALID_POST_REQUEST);
        
    }

    @Override
    @Transactional(readOnly = true)
    public Slice<PostURLResponse> showPostListByUrl(String url, Long cursor, Pageable pageable) {
        if (cursor == null) cursor = Long.MAX_VALUE;

        Slice<Post> posts = postRepository.findAllByUrlAndIdLessThan(url, cursor, pageable);
        List<PostURLResponse> postURLResponses = posts.stream()
                .map(post -> {
                    List<HighlightResponse> highlights = post.getHighlights()
                            .stream()
                            .map(HighlightResponse::of)
                            .collect(Collectors.toList());

                    List<CommentResponse> comments = new ArrayList<>();
                    Long currentMemberId = SecurityUtil.getCurrentMemberId();
                    Member currentMember = memberService.findById(currentMemberId);

                    Boolean isBookmark = bookmarkRepository.findByPostAndMember(post, currentMember).isPresent();
                    Boolean isLike = likeRepository.existsByMemberAndPost(currentMember, post);

                    return PostURLResponse.from(post, highlights, comments, !isNotOwner(post.getMember(), currentMember), isLike, isBookmark);
                })
                .collect(Collectors.toList());

        return new SliceImpl<>(postURLResponses, pageable, posts.hasNext());
    }

    @Override
    @Transactional(readOnly = true)
    public Post findById(Long postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(POST_NOT_FOUND));
    }

    private Slice<PostListResponse> showPostListByDirectoryIdAndKeyword(Long directoryId, String keyword,
                                                                        Long cursor, Pageable pageable) {
        Directory directory = directoryRepository.findDirectoryById(directoryId)
                .orElseThrow(() -> new BadRequestException(DIRECTORY_NOT_FOUND));
        Slice<Long> postIds = postElasticService.findMyHiveByKeyword(keyword, pageable, cursor, directory);

        List<Post> posts = postIds.getContent().stream()
                .map(postId -> postRepository.findById(postId)
                        .orElseThrow(() -> new BadRequestException(POST_NOT_FOUND)))
                .collect(Collectors.toList());

        Slice<Post> postSlice = new SliceImpl<>(posts, pageable, postIds.hasNext());
        return makePostListResponseWithPosts(postSlice);
    }

    private Slice<PostListResponse> showPostListByKeyword(String query, Pageable pageable, Long cursor) {
        Slice<Long> postIds = postElasticService.findByKeyword(query, pageable, cursor);

        List<Post> posts = postIds.getContent().stream()
                .map(postId -> postRepository.findById(postId)
                        .orElseThrow(() -> new BadRequestException(POST_NOT_FOUND)))
                .collect(Collectors.toList());

        Slice<Post> postSlice = new SliceImpl<>(posts, pageable, postIds.hasNext());
        return makePostListResponseWithPosts(postSlice);
    }

    private Slice<PostListResponse> showFollowingPostListByMemberId(Long memberId, Long cursor, Pageable pageable) {
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
                    List<Highlight> highlights = highlightRepository.findAllByPost(post);
                    Integer relatedFeedNumber = postRepository.countPostsByUrl(post.getUrl());
                    return PostListResponse.from(post, highlights,
                            checkIfLikedByCurrentUser(post),
                            checkIfBookmarkedByCurrentUser(post),
                            relatedFeedNumber);
                })
                .collect(Collectors.toList());

        return new SliceImpl<>(postListResponses, posts.getPageable(), posts.hasNext());
    }

    private boolean checkIfLikedByCurrentUser(Post post) {
        Member currentMember = memberService.findById(SecurityUtil.getCurrentMemberId());
        return likeRepository.findByMemberAndPost(currentMember, post).isPresent();
    }

    private boolean checkIfBookmarkedByCurrentUser(Post post) {
        Member currentMember = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
        return bookmarkRepository.findByPostAndMember(post, currentMember).isPresent();
    }

    private Boolean isNotOwner(Member member, Member OwnerMember) {
        // 주소값이 다르기 때문에 equals 보다는 == 이 더 효율적임
        return member != OwnerMember;
    }
}