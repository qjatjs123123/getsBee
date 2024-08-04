package com.ssafy.getsbee.domain.post.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.ssafy.getsbee.domain.post.entity.QPost.post;

@Repository
@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final DirectoryRepository directoryRepository;

    @Override
    public Slice<Post> findAllByMemberId(Long memberId, Long cursor, Pageable pageable) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        BooleanExpression condition = createCondition(memberId, currentMemberId)
                .and(cursorCondition(cursor));

        return executeCursorQuery(condition, pageable);
    }

    @Override
    public Slice<Post> findAllByDirectoryId(Long directoryId, Long cursor, Pageable pageable) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Directory directory = directoryRepository.findDirectoryById(directoryId);
        BooleanExpression condition = createCondition(directory.getMember().getId(), currentMemberId)
                .and(post.directory.id.eq(directoryId))
                .and(cursorCondition(cursor));

        return executeCursorQuery(condition, pageable);
    }

    @Override
    public Slice<Post> findAllByDirectories(List<Directory> directories, Long cursor, Pageable pageable) {
        List<Long> directoryIds = directories.stream()
                .map(Directory::getId)
                .collect(Collectors.toList());

        BooleanExpression condition = post.directory.id.in(directoryIds)
                .and(cursorCondition(cursor));

        return executeCursorQuery(condition, pageable);
    }

    private BooleanExpression createCondition(Long memberId, Long currentMemberId) {
        BooleanExpression condition = post.member.id.eq(memberId);
        if (!memberId.equals(currentMemberId)) {
            condition = condition.and(post.directory.name.ne("Temporary"))
                    .and(post.directory.name.ne("Bookmark"))
                    .and(post.isPublic.eq(true));
        }
        return condition;
    }

    private BooleanExpression cursorCondition(Long cursor) {
        return cursor != null ? post.id.lt(cursor) : null;
    }

    private Slice<Post> executeCursorQuery(BooleanExpression condition, Pageable pageable) {
        JPAQuery<Post> query = queryFactory
                .selectFrom(post)
                .where(condition)
                .orderBy(post.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1); // 다음 페이지가 있는지 확인하기 위해 페이지 크기보다 1개 더 가져옴

        List<Post> posts = query.fetch();

        boolean hasNext = posts.size() > pageable.getPageSize();
        if (hasNext) {
            posts.remove(pageable.getPageSize()); // 다음 페이지가 있으면 마지막 원소 제거
        }

        return new SliceImpl<>(posts, pageable, hasNext);
    }
}