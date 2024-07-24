package com.ssafy.getsbee.domain.directory.repository;

import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface                                                                                                                                                    DirectoryRepository extends JpaRepository<Directory, Long> {

    List<DirectoryResponse> findDirectoriesByMemberId(Long memberId);
}
