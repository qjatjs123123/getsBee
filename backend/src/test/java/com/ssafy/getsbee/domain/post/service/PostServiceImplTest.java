package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.GetsbeeApplication;
import com.ssafy.getsbee.domain.highlight.entity.Type;
import com.ssafy.getsbee.domain.post.dto.request.PostListRequest;
import com.ssafy.getsbee.domain.post.dto.response.PostListResponse;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.domain.member.entity.Authority;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.global.util.SecurityUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = GetsbeeApplication.class)
@Transactional
@ActiveProfiles("local")
class PostServiceImplTest {

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private DirectoryRepository directoryRepository;

    @Autowired
    private HighlightRepository highlightRepository;

    private Directory temporaryDirectory;

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .email("example@example.com")
                .provider(Provider.GOOGLE)
                .authority(Authority.ROLE_USER)
                .birthYear(1990)
                .picture("profile.jpg")
                .name("John Doe")
                .isDeleted(false)
                .build();
        member = memberRepository.save(member);
        directoryRepository.createDefaultDirectoriesForMember(member);
        temporaryDirectory = directoryRepository.findTemporaryDirectoryByMember(member);

        Post post1 = Post.builder()
                .title("Post 1")
                .url("https://example.com/post1")
                .thumbnailUrl("https://s3.example.com/thumbnail1.jpg")
                .member(member)
                .directory(temporaryDirectory)
                .build();
        post1 = postRepository.save(post1);

        Post post2 = Post.builder()
                .title("Post 2")
                .url("https://example.com/post2")
                .thumbnailUrl("https://s3.example.com/thumbnail2.jpg")
                .member(member)
                .directory(temporaryDirectory)
                .build();
        post2 = postRepository.save(post2);

        Highlight highlight1 = Highlight.builder()
                .color("AAAAAA")
                .content("highlight content 1")
                .post(post1)
                .type(Type.IMAGE)
                .isDeleted(false)
                .build();
        highlightRepository.save(highlight1);

        Highlight highlight2 = Highlight.builder()
                .color("BBBBBB")
                .content("highlight content 2")
                .post(post2)
                .type(Type.IMAGE)
                .isDeleted(false)
                .build();
        highlightRepository.save(highlight2);
    }

    @Test
    void showPostListByDirectoryId() {
        System.out.println("---------showPostListByDirectoryId---------");
        // Create Pageable object for pagination
        Pageable pageable = PageRequest.of(0, 10);

        // Create a PostListRequest for the temporary directory
        PostListRequest postListRequest = PostListRequest.builder()
                .directoryId(temporaryDirectory.getId())
                .page(0)
                .build();

        // Fetch the post list responses for the given directory
        Page<PostListResponse> postListResponses = postService.showPostList(postListRequest);

        // Assertions to verify the fetched data
        assertNotNull(postListResponses, "Post list should not be null");
        assertEquals(2, postListResponses.getTotalElements(), "Total number of posts should be 2");

        // Validate details of the first post
        PostListResponse post1 = postListResponses.stream()
                .filter(p -> p.post().title().equals("Post 1"))
                .findFirst()
                .orElse(null);
        assertNotNull(post1, "Post 1 should not be null");
        assertEquals("Post 1", post1.post().title(), "Post 1 title should match");
        assertEquals("https://example.com/post1", post1.post().url(), "Post 1 URL should match");
        assertEquals("AAAAAA", post1.highlight().firstHighlightColor(), "Post 1 first highlight color should match");

        // Validate details of the second post
        PostListResponse post2 = postListResponses.stream()
                .filter(p -> p.post().title().equals("Post 2"))
                .findFirst()
                .orElse(null);
        assertNotNull(post2, "Post 2 should not be null");
        assertEquals("Post 2", post2.post().title(), "Post 2 title should match");
        assertEquals("https://example.com/post2", post2.post().url(), "Post 2 URL should match");
        assertEquals("BBBBBB", post2.highlight().firstHighlightColor(), "Post 2 first highlight color should match");
    }
}
