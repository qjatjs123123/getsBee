package com.ssafy.getsbee.domain.highlight.entity;

import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE highlight SET is_deleted = true WHERE highlight_id = ?")
@SQLRestriction("is_deleted = false")
public class Highlight extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "highlight_id")
    private Long id;

    @Column(columnDefinition = "longtext not null")
    private String content;

    @Column(length = 6, nullable = false)
    private String color;

    @Column(name = "start_index")
    private Integer startIndex;

    @Column(name = "last_index")
    private Integer lastIndex;

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
    public Highlight(Long id, String content, String color, Integer startIndex, Integer lastIndex, Integer startOffset,
                     Integer lastOffset, Type type, Boolean isDeleted, Post post) {
        this.id = id;
        this.content = content;
        this.color = color;
        this.startIndex = startIndex;
        this.lastIndex = lastIndex;
        this.startOffset = startOffset;
        this.lastOffset = lastOffset;
        this.type = type;
        this.isDeleted = isDeleted;
        this.post = post;
    }

    @Builder
    public Highlight(String content, String color, Integer startIndex, Integer lastIndex, Integer startOffset,
                     Integer lastOffset, Type type, Post post) {
        this.content = content;
        this.color = color;
        this.startIndex = startIndex;
        this.lastIndex = lastIndex;
        this.startOffset = startOffset;
        this.lastOffset = lastOffset;
        this.isDeleted = false;
        this.type = type;
        this.post = post;
    }



}