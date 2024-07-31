package com.ssafy.getsbee.domain.post.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.QDirectory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.error.exception.NotFoundException;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;

import static com.ssafy.getsbee.domain.post.entity.QPost.post;
import static com.ssafy.getsbee.global.error.ErrorCode.MEMBER_NOT_FOUND;

@Repository
@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom{

    private final JPAQueryFactory queryFactory;
    private final MemberRepository memberRepository;
    private final DirectoryRepository directoryRepository;

    @Override
    public Page<Post> findAllByMemberId(Long memberId, Pageable pageable) {
        QDirectory directory = QDirectory.directory;

        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        BooleanExpression condition = post.member.id.eq(memberId);

        if (!memberId.equals(currentMemberId)) {
            Member member = memberRepository.findById(memberId)
                    .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));

            Directory temporaryDirectory = directoryRepository.findTemporaryDirectoryByMember(member);
            Directory bookmarkDirectory = directoryRepository.findBookmarkDirectoryByMember(member);

            condition = condition.and(post.directory.ne(temporaryDirectory)
                    .and(post.directory.ne(bookmarkDirectory)));
        }

        JPAQuery<Post> query = queryFactory
                .selectFrom(post)
                .where(condition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        List<Post> posts = query.fetch();
        long total = queryFactory
                .selectFrom(post)
                .where(condition)
                .fetchCount();

        return new PageImpl<>(posts, pageable, total);
    }
}