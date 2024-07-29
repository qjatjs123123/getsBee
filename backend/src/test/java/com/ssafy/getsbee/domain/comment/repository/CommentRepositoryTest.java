package com.ssafy.getsbee.domain.comment.repository;

import com.ssafy.getsbee.GetsbeeApplication;
import com.ssafy.getsbee.domain.comment.entity.Comment;
import com.ssafy.getsbee.domain.member.entity.Authority;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.ssafy.getsbee.domain.post.entity.Post;

import java.util.List;

import static com.ssafy.getsbee.domain.member.entity.Authority.*;
import static com.ssafy.getsbee.domain.member.entity.Provider.*;
import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest(classes = GetsbeeApplication.class)
@ActiveProfiles("local")
class CommentRepositoryTest {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PostRepository postRepository;

    private Post post;
    private Member member;


    @BeforeEach
    void setUp(){
        member = Member.builder()
                .email("test@example.com")
                .provider(GOOGLE)
                .authority(ROLE_USER)
                .birthYear(1990)
                .picture("profile.jpg")
                .name("John Doe")
                .isDeleted(false)
                .build();
        member = memberRepository.save(member);

        post = Post.builder()
                .title("Test Post")
                .url("https://example.com")
                .thumbnailUrl("https://example.com/thumbnail.jpg")
                .member(member)
                .build();
        post = postRepository.save(post);

        Comment comment1 = Comment.builder()
                .content("First comment")
                .member(member)
                .post(post)
                .isDeleted(false)
                .build();
        commentRepository.save(comment1);

        Comment comment2 = Comment.builder()
                .content("Second comment")
                .member(member)
                .post(post)
                .isDeleted(false)
                .build();
        commentRepository.save(comment2);
    }

    @Test
    void findByPostIdTest() {
        Comment comment1 = new Comment("Test Comment 1", member, post, false);
        Comment comment2 = new Comment("Test Comment 2", member, post, false);
        commentRepository.save(comment1);
        commentRepository.save(comment2);

        List<Comment> comments = commentRepository.findByPostId(post.getId());

        assertNotNull(comments);
        assertEquals(2, comments.size());
        assertTrue(comments.stream().anyMatch(c -> c.getContent().equals("Test Comment 1")));
        assertTrue(comments.stream().anyMatch(c -> c.getContent().equals("Test Comment 2")));
    }
}