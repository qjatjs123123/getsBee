package com.ssafy.getsbee.domain.highlight.entity;

import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HighlightLog extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long log_id;

    @Column(name = "highlight_id")
    private Long id;

    @Column(columnDefinition = "longtext not null")
    private String content;

    @Column(length = 6, nullable = false)
    private String color;

    @Column(name = "start_index")
    private String startIndex;

    @Column(name = "last_index")
    private String lastIndex;

    @Column(name = "start_offset")
    private Integer startOffset;

    @Column(name = "last_offset")
    private Integer lastOffset;

    @Column(length = 5, nullable = false)
    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="post_id")
    private Post post;

    @Builder
    public HighlightLog(Highlight highlight, Boolean isDeleted, Post post) {
        this.id = highlight.getId();
        this.content = highlight.getContent();
        this.color = highlight.getColor();
        this.startIndex = highlight.getStartIndex();
        this.lastIndex = highlight.getLastIndex();
        this.startOffset = highlight.getStartOffset();
        this.lastOffset = highlight.getLastOffset();
        this.isDeleted = isDeleted;
        this.type = Type.TEXT;
        this.post = post;
    }

    public void changeColor(String color) {
        this.color = color;
    }

    public void changeIndexs(String startIndex, Integer startOffset, String lastIndex, Integer lastOffset) {
        this.startIndex = startIndex;
        this.startOffset = startOffset;
        this.lastIndex = lastIndex;
        this.lastOffset = lastOffset;
    }
}