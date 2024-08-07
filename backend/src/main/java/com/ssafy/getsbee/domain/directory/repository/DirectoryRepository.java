package com.ssafy.getsbee.domain.directory.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DirectoryRepository extends JpaRepository<Directory, Long>, DirectoryRepositoryCustom {

    Optional<Directory> findDirectoryById(Long directoryId);

    List<Directory> findAllByMember(Member member);
}
