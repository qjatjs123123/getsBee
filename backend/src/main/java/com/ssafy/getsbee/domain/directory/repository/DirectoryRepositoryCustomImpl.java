package com.ssafy.getsbee.domain.directory.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.QDirectory;
import com.ssafy.getsbee.domain.member.entity.Member;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DirectoryRepositoryCustomImpl implements DirectoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    private final EntityManager em;

    @Override
    public Directory findRootDirectoryByMember(Member member) {
        QDirectory directory = QDirectory.directory;

        return queryFactory
                .selectFrom(directory)
                .where(directory.member.id.eq(member.getId())
                        .and(directory.depth.eq(0)))
                .fetchOne();
    }

    @Override
    @Transactional
    public void createDefaultDirectoriesForMember(Member member) {
        // root 디렉토리
        Directory rootDirectory = Directory.builder()
                .name("Root Directory")
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
                .name("Bookmark Directory")
                .depth(1)
                .prevDirectory(temporaryDirectory)
                .nextDirectory(null)
                .parentDirectory(rootDirectory)
                .member(member)
                .isDeleted(false)
                .build();
        em.persist(bookmarkDirectory);

        temporaryDirectory.setNextDirectory(bookmarkDirectory);
        em.merge(temporaryDirectory);
    }
}