package com.ssafy.getsbee.domain.directory.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.DirectoryDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DirectoryElasticRepository extends ElasticsearchRepository<DirectoryDocument, String> {
    Page<DirectoryDocument> findAllByDirectoryIdLessThanAndDirectoryNameIsLikeOrderByDirectoryIdDesc(Long directoryId,
                                                                                                     String directoryName,
                                                                                                     Pageable pageable);

    Optional<DirectoryDocument> findByDirectoryId(Long id);
}
