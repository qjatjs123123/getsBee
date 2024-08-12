package com.ssafy.getsbee.domain.highlight.dto.request;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.Type;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import jakarta.validation.constraints.NotNull;

public record CreateHighlightRequest (
        @NotNull
        String url,
        String thumbnailUrl,
        String title,
        @NotNull
        String content,
        @NotNull
        String color,
        @NotNull
        String startIndex,
        @NotNull
        Integer startOffset,
        @NotNull
        String lastIndex,
        @NotNull
        Integer lastOffset,
        @NotNull
        Type type,
        String message
) {
    public Post toPostEntity(Member member, Directory directory) {
        return Post.builder()
                .title(title)
                .url(url)
                .thumbnailUrl(thumbnailUrl)
                .member(member)
                .directory(directory)
                .build();
    }

    public Highlight toHighlightEntity(Post post) {
        return Highlight.builder()
                .content(content)
                .color(color)
                .startIndex(startIndex)
                .startOffset(startOffset)
                .lastIndex(lastIndex)
                .lastOffset(lastOffset)
                .type(type)
                .post(post)
                .build();
    }
}
