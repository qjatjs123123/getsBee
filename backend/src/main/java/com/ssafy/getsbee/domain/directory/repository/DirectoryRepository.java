package com.ssafy.getsbee.domain.directory.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DirectoryRepository extends JpaRepository<Directory, Long> {
}
