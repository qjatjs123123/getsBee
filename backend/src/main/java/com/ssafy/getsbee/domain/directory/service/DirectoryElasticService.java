package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.DirectoryDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface DirectoryElasticService {

    void saveDirectoryDocument(Directory directory);

    void deleteDirectoryDocument(Directory directory);

    void updateDirectoryDocument(Directory directory);

    Slice<Long> findByKeyword(String keyword, Pageable pageable, Long directoryId);
}
