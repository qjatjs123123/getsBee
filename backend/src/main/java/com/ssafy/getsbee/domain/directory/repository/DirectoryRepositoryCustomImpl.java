package com.ssafy.getsbee.domain.directory.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.QPost;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import static com.ssafy.getsbee.domain.directory.entity.QDirectory.*;
import static com.ssafy.getsbee.domain.post.entity.QPost.post;


@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DirectoryRepositoryCustomImpl implements DirectoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;
    private final DirectoryRepository directoryRepository;

    private static final int ROOT_DEPTH = 0;
    private static final int BOOKMARK_DEPTH = 1;
    private static final int TEMPORARY_DEPTH = 1;

    @Override
    public Directory findRootDirectoryByMember(Member member) {
        return queryFactory
                .selectFrom(directory)
                .where(directory.member.id.eq(member.getId())
                        .and(directory.depth.eq(ROOT_DEPTH)))
                .fetchOne();
    }

    @Override
    public Directory findTemporaryDirectoryByMember(Member member) {
        return queryFactory
                .selectFrom(directory)
                .where(directory.member.id.eq(member.getId())
                        .and(directory.depth.eq(TEMPORARY_DEPTH))
                        .and(directory.name.eq("Temporary")))
                .fetchOne();
    }

    @Override
    public Directory findBookmarkDirectoryByMember(Member member) {
        return queryFactory
                .selectFrom(directory)
                .where(directory.member.id.eq(member.getId())
                        .and(directory.depth.eq(BOOKMARK_DEPTH))
                        .and(directory.name.eq("Bookmark")))
                .fetchOne();
    }

    @Override
    @Transactional
    public void createDefaultDirectoriesForMember(Member member) {
        // root 디렉토리
        Directory rootDirectory = Directory.builder()
                .name("Root")
                .depth(0)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(null)
                .member(member)
                .isDeleted(false)
                .build();
        em.persist(rootDirectory);

        // temporary 디렉토리
        Directory temporaryDirectory = Directory.builder()
                .name("Temporary")
                .depth(1)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(rootDirectory)
                .member(member)
                .isDeleted(false)
                .build();
        em.persist(temporaryDirectory);

        // 북마크 디렉토리
        Directory bookmarkDirectory = Directory.builder()
                .name("Bookmark")
                .depth(1)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(rootDirectory)
                .member(member)
                .isDeleted(false)
                .build();
        em.persist(bookmarkDirectory);

        bookmarkDirectory.setPrevDirectory(temporaryDirectory);
        temporaryDirectory.setNextDirectory(bookmarkDirectory);
        em.merge(temporaryDirectory);
    }

    @Override
    public Directory createNewDirectoryForMember(Member member, String newDirectoryName) {
        Directory temp = Directory.builder()
                .name(newDirectoryName)
                .depth(1)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(null)
                .member(member)
                .isDeleted(false)
                .build();
        em.persist(temp);
        em.flush(); //flush 해야 db에 삽입
        return temp;
    }

    @Override
    public Long countPostsForMember(Member member) {
        QPost post = QPost.post;

        return queryFactory
                .select(post.count())
                .from(post)
                .where(post.member.eq(member))
                .fetchOne();
    }

    @Override
    public Long countTemporaryPostsForMember(Member member) {
        Directory temp = directoryRepository.findTemporaryDirectoryByMember(member);
        QPost post = QPost.post;

        return queryFactory
                .select(post.count())
                .from(post)
                .where(post.directory.eq(temp))
                .fetchOne();
    }
}