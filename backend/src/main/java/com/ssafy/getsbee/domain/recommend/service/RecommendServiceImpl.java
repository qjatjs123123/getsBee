package com.ssafy.getsbee.domain.recommend.service;

import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.domain.post.service.PostService;
import com.ssafy.getsbee.domain.recommend.dto.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendServiceImpl implements RecommendService {

    private final MemberService memberService;
    private final PostService postService;
    private final DirectoryService directoryService;
    private final InterestRepository interestRepository;
    private final PostRepository postRepository;

    @Override
    public Slice<RecommendResponse> recommendPersonalizePosts(Long memberId, Pageable pageable) {
        Member member = memberService.findById(memberId);
        List<Category> categories = mapToCategory(interestRepository.findAllByMember(member));
        return mapToRecommendResponse(categories, pageable);
    }

    @Override
    public Slice<RecommendResponse> recommendRelatedPosts(Long postId, Pageable pageable) {
        List<Category> categories = mapToCategory(interestRepository.findByUrl(postService.findById(postId).getUrl()));
        return mapToRecommendResponse(categories, pageable);
    }

    private List<Category> mapToCategory(List<Interest> interests) {
        return interests.stream()
                .map(Interest::getCategory)
                .toList();
    }

    private Slice<RecommendResponse> mapToRecommendResponse(List<Category> categories, Pageable pageable) {
        for (Category category : categories) {
            System.out.println(category.getValue());
        }
        return postRepository.findAllByCategory(categories, pageable).map(post ->
                RecommendResponse.of(PostResponse.of(post),
                        MemberResponse.of(post.getMember()),
                        DirectoryResponse.of(post.getDirectory().getId(), directoryService.findFullNameByDirectory(post.getDirectory())),
                        HighlightResponse.of(post.getHighlights())));
    }
}
