package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.entity.PostDocument;

import java.util.List;

public interface PostElasticService {
    void savePostDocument(Highlight highlight);

    void deletePostDocument(Post post);

    void updatePostDocument(Post post, Highlight highlight);

    void deleteHighlightDocument(Highlight highlight);

    List<PostDocument> findByKeyword(String keyword);
}
