package com.ssafy.getsbee.domain.post.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import static com.ssafy.getsbee.domain.post.entity.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Post> findAllByMemberId(Long memberId, Pageable pageable) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();

        BooleanExpression condition = post.member.id.eq(memberId);
        if (!memberId.equals(currentMemberId)) {
            condition = condition.and(post.directory.name.ne("Temporary"))
                    .and(post.directory.name.ne("Bookmark"));
        }

        JPAQuery<Post> query = queryFactory
                .selectFrom(post)
                .where(condition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        List<Post> posts = query.fetch();
        Long total = Optional.ofNullable(queryFactory.select(post.count())
                .from(post)
                .where(condition)
                .fetchOne()).orElse(0L);

        return new PageImpl<>(posts, pageable, total);
    }
}