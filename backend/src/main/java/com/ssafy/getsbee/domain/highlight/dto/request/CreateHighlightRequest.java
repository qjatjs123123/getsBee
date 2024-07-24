package com.ssafy.getsbee.domain.highlight.dto.request;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.Type;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;

public record CreateHighlightRequest (
        String url,
        String thumbnailUrl,
        String title,
        String content,
        String color,
        Integer startIndex,
        Integer startOffset,
        Integer lastIndex,
        Integer lastOffset,
        Type type
) {
    public Post createPost(Member member, Directory directory) {
        return Post.builder()
                .title(title)
                .url(url)
                .thumbnailUrl(thumbnailUrl)
                .member(member)
                .directory(directory)
                .build();
    }

    public Highlight createHighlight(Post post) {
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
