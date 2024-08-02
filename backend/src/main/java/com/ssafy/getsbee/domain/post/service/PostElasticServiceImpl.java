package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.entity.PostDocument;
import com.ssafy.getsbee.domain.post.repository.PostElasticRepository;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
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
    public List<SearchHit<PostDocument>> findByKeyword(String keyword, Pageable pageable) {

        NativeQuery query = NativeQuery.builder()
                .withQuery(q -> q
                        .moreLikeThis(mlt -> mlt
                                .fields("title", "highlights.content")
                                .like(l -> l.text(keyword))
                                .minTermFreq(1)
                                .minDocFreq(1)
                        )
                )
                .withFilter(q -> q
                        .bool(b -> b
                                .must(m -> m
                                        .term(t -> t.field("isPublic").value(true))
                                )
                                .must(m -> m
                                        .term(t -> t.field("isDeleted").value(false))
                                )
                                .must(m -> m
                                        .term(t -> t.field("highlights.isDeleted").value(false))
                                )
                        )
                )
                .withPageable(pageable)
                .build();

        List<SearchHit<PostDocument>> result = operations.search(query, PostDocument.class).stream().toList();
        System.out.println(result);

        return result;

        //return postElasticRepository.findAllByTitleIsLikeOrHighlightsContentIsLikeAndIsDeletedFalseAndIsPublicTrue(keyword, keyword, pageable);
        // return postElasticRepository.findAllByTitleIsLikeOrHighlightsContentIsLikeAndIsDeletedFalseAndIsPublicTrueAndHighlightsIsDeletedFalse(keyword, keyword);
    }

}
