package com.ssafy.getsbee.domain.highlight.entity;

import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE highlight SET is_deleted = true WHERE highlight_id = ?")
@Where(clause = "is_deleted = false")
public class Highlight extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "highlight_id")
    private Long id;

    @Column(columnDefinition = "longtext not null")
    private String content;

    @Column(length = 50, nullable = false)
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
    private String type;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="post_id")
    private Post post;
}
