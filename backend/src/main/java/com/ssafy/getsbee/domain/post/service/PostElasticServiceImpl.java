package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.entity.PostDocument;
import com.ssafy.getsbee.domain.post.repository.PostElasticRepository;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.getsbee.global.error.ErrorCode.POSTDOCUMENT_NOT_FOUND;
import static com.ssafy.getsbee.global.error.ErrorCode.POST_NOT_FOUND;


@Service
@RequiredArgsConstructor
public class PostElasticServiceImpl implements PostElasticService {

    private final PostRepository postRepository;
    private final PostElasticRepository postElasticRepository;

    @Override
    public void savePostDocument(Highlight highlight) {
        PostDocument postDocument = postElasticRepository.findByPostId(highlight.getPost().getId())
                .orElseGet(() -> postElasticRepository.save(new PostDocument(highlight.getPost())));

        Post post = postRepository.findById(postDocument.getPostId()).orElseThrow(
                () -> new BadRequestException(POST_NOT_FOUND));
        post.addHighlight(highlight);
        postDocument.assembleText(post);
        postElasticRepository.save(postDocument);
    }

    @Override
    public void deletePostDocument(Post post) {
        PostDocument postDocument = postElasticRepository.findByPostId(post.getId()).
                orElseThrow(()-> new BadRequestException(POSTDOCUMENT_NOT_FOUND));

        postElasticRepository.delete(postDocument);
    }

    @Override
    public void updatePostDocument(Post post) {
        PostDocument postDocument = postElasticRepository.findByPostId(post.getId()).
                orElseThrow(()-> new BadRequestException(POSTDOCUMENT_NOT_FOUND));

        postDocument.updatePostDocument(post);
        postElasticRepository.save(postDocument);
    }

    @Override
    public void deleteHighlightDocument(Highlight highlight) {
        PostDocument postDocument = postElasticRepository.findByPostId(highlight.getPost().getId()).
                orElseThrow(()-> new BadRequestException(POSTDOCUMENT_NOT_FOUND));

        Post post = postRepository.findById(postDocument.getPostId()).orElseThrow(
                () -> new BadRequestException(POST_NOT_FOUND));

        post.deleteHighlight(highlight);
        postDocument.assembleText(post);
        postElasticRepository.save(postDocument);
    }

    @Override
    public Slice<Long> findByKeyword(String keyword, Pageable pageable, Long postId) {
        Pageable pageable1 = PageRequest.ofSize(pageable.getPageSize() + 1);

        Page<PostDocument> page = postElasticRepository.findAllByPostIdLessThanAndAllContentIsLikeOrderByPostIdDesc(postId, keyword, pageable1);

        boolean hasNext;
        List<Long> postIds = new ArrayList<>();
        page.getContent().stream().map(PostDocument::getPostId).forEach(postIds::add);
        if(page.getTotalElements() == pageable.getPageSize() + 1) {
            hasNext = true;
            postIds.remove(postIds.size() - 1);
        }else hasNext = false;

        return new SliceImpl<>(postIds, pageable, hasNext);
    }

}
