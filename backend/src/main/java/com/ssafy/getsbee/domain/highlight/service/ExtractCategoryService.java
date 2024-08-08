package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.post.entity.Post;

import java.util.Optional;

public interface ExtractCategoryService {

    Optional<Category> extractCategoryFromPost(Post post);
}
