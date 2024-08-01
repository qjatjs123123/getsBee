package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.entity.PostDocument;
import com.ssafy.getsbee.domain.post.repository.PostElasticRepository;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class PostElasticServiceImpl implements PostElasticService {

    private final PostElasticRepository postElasticRepository;
    private final ElasticsearchOperations operations;

    IndexCoordinates index = IndexCoordinates.of("post");

    @Override
    public void savePostDocument(Highlight highlight) {
        PostDocument postDocument = postElasticRepository.findById(String.valueOf(highlight.getPost().getId()))
                .orElseGet(() -> postElasticRepository.save(new PostDocument(highlight.getPost())));

        postDocument.addHighlight(highlight);
        postElasticRepository.save(postDocument);
    }

    @Override
    public void deletePostDocument(Post post) {
        PostDocument postDocument = postElasticRepository.findById(String.valueOf(post.getId())).
                orElseThrow(()-> new BadRequestException(ErrorCode.POSTDOCUMENT_NOT_FOUND));

        postDocument.deleteAllHighlightDocuments();
        postDocument.deletePostDocument();

        postElasticRepository.save(postDocument);
    }

    @Override
    public void updatePostDocument(Post post, Highlight highlight) {

    }

    @Override
    public void deleteHighlightDocument(Highlight highlight) {
        PostDocument postDocument = postElasticRepository.findById(String.valueOf(highlight.getPost().getId())).
                orElseThrow(()-> new BadRequestException(ErrorCode.POSTDOCUMENT_NOT_FOUND));

        postDocument.deleteHighlight(highlight);
        postElasticRepository.save(postDocument);
    }

    @Override
    public List<PostDocument> findByKeyword(String keyword) {

//        Query query = NativeQuery.builder()
//                .withQuery(q -> q
//                        .matchAll(ma -> ma))  // 모든 문서를 매칭하는 쿼리
//                .withFilter(q -> q
//                        .bool(b -> b
//                                .must(m -> m
//                                        .moreLikeThis(ml -> ml.fields("title", "highlights.content")
//                                                .like(l ->l.text(keyword))  // 키워드 분석기 설정
//                                                .minTermFreq(1)    // 최소 용어 빈도 설정
//                                                .minDocFreq(1)     // 최소 문서 빈도 설정
//                                        )
//                                )
//                                .filter(f -> f
//                                        .bool(bf -> bf
//                                                .must(mt -> mt
//                                                        .term(t -> t.field("isPublic").value(true))  // isPublic이 true인 문서 필터링
//                                                )
//                                                .must(mt -> mt
//                                                        .term(t -> t.field("isDeleted").value(false))  // isDeleted가 false인 문서 필터링
//                                                )
//                                        )
//                                )
//                        )
//                )
//                .withPageable(PageRequest.of(1, 10))  // 페이지 설정: 1페이지, 페이지당 10개 문서
//                .build();
//        ElasticsearchAggregation aggregations = (ElasticsearchAggregation) operations.search(query, PostDocument.class, index);
//        return operations.search(query, PostDocument.class, index);

        return postElasticRepository.findAllByTitleIsLikeOrHighlightsContentIsLikeAndIsDeletedFalseAndIsPublicTrueAndHighlightsIsDeletedFalse(keyword, keyword);
    }


}
