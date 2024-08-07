package com.ssafy.getsbee.domain.post.service;

import com.ssafy.getsbee.domain.interest.entity.Category;
import com.ssafy.getsbee.domain.post.entity.Post;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExtractCategoryServiceImpl implements ExtractCategoryService {

    private final ChatModel chatModel;

    @Override
    public String extractCategoryFromPost(String request) {
        return null;
    }
}
