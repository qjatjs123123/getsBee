package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.post.entity.PostDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PostElasticRepository extends ElasticsearchRepository<PostDocument, String> {

    Page<PostDocument> findAllByTitleIsLikeOrHighlightsContentIsLikeAndIsDeletedFalseAndIsPublicTrue(String title, String highlightsContent, Pageable pageable);
}