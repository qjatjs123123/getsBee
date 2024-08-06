package com.ssafy.getsbee.domain.comment.service;

import com.ssafy.getsbee.domain.comment.entity.Comment;
import com.ssafy.getsbee.domain.comment.repository.CommentRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Override
    public List<Comment> findCommentListByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    @Override
    @Transactional
    public Comment addComment(Long postId, Long memberId, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new BadRequestException(POST_NOT_FOUND));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BadRequestException(MEMBER_NOT_FOUND));

        Comment comment = Comment.builder()
                .post(post)
                .member(member)
                .content(content)
                .isDeleted(false)
                .build();

        post.getComments().add(comment);

        return commentRepository.save(comment);
    }

    @Override
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BadRequestException(COMMENT_NOT_FOUND));

        Long memberId = comment.getMember().getId();
        if(!memberId.equals(SecurityUtil.getCurrentMemberId())){
            throw new BadRequestException(INVALID_COMMENT_REQUEST);
        }

        Post post = comment.getPost();
        post.getComments().remove(comment);

        commentRepository.delete(comment);
    }
}
