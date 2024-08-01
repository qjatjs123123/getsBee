package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.post.entity.PostDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PostElasticRepository extends ElasticsearchRepository<PostDocument, String> {

    List<PostDocument> findAllByTitleIsLikeOrHighlightsContentIsLikeAndIsDeletedFalseAndIsPublicTrueAndHighlightsIsDeletedFalse(String title, String highlightsContent);

    //Page<?> findAllByTitleIsLikeOrHighlightsContentIsLike(String title, String highlightsContent, Pageable pageable);
}