package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.entity.PostDocument;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PostElasticService {

    void savePostDocument(Highlight highlight);

    void deletePostDocument(Post post);

    void deleteHighlightDocument(Highlight highlight);

    Slice<Long> findByKeyword(String keyword, Pageable pageable, Long postId);

    void updatePostDocument(Post post);
}
