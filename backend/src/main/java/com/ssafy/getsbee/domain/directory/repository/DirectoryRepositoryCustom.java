package com.ssafy.getsbee.domain.directory.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectoryRepositoryCustom {

    Directory findRootDirectoryByMember(Member member);

    Directory findBookmarkDirectoryByMember(Member member);

    Directory findTemporaryDirectoryByMember(Member member);
    void createDefaultDirectoriesForMember(Member member);
}
