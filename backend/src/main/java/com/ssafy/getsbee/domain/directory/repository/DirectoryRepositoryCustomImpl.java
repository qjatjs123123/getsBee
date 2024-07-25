package com.ssafy.getsbee.domain.directory.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.QDirectory;
import com.ssafy.getsbee.domain.member.entity.Member;
import jakarta.persistence.EntityManager;

public class DirectoryRepositoryCustomImpl implements DirectoryRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    public DirectoryRepositoryCustomImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Directory findRootDirectoryByMember(Member member) {
        QDirectory directory = QDirectory.directory;

        return queryFactory
                .selectFrom(directory)
                .where(directory.member.id.eq(member.getId())
                        .and(directory.depth.eq(0)))
                .fetchOne();
    }
}
