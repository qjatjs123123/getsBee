package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static com.ssafy.getsbee.global.consts.StaticConst.*;

@Component
@RequiredArgsConstructor
public class ExtractCategoryServiceImpl implements ExtractCategoryService {

    private final ChatModel chatModel;

    @Override
    public Optional<Category> extractCategoryFromPost(Post post) {
        return Category.findCategory(chatModel.call(makePromptRequest(post)));
    }

    private String makePromptRequest(Post post) {
        if (post.getTitle().isEmpty()) {
            return post.getUrl() + EXTRACT_CATEGORY_PROMPT;
        }
        return post.getUrl() + COMMA + post.getTitle() + EXTRACT_CATEGORY_PROMPT;
    }
}
