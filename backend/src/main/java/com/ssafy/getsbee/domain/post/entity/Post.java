package com.ssafy.getsbee.domain.post.entity;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE post SET is_deleted = true WHERE post_id = ?")
@Where(clause = "is_deleted = false")
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @Column(length = 50, nullable = false)
    private String title;

    @Column(length = 2083, nullable = false)
    private String url;

    @Column(columnDefinition = "longtext")
    private String note;

    @Column(name = "is_public", columnDefinition = "bigint not null default 0")
    private Boolean isPublic;

    @Column(name = "view_count", columnDefinition = "bigint not null default 0")
    private Long viewCount;

    @Column(name = "like_count", columnDefinition = "bigint not null default 0")
    private Long likeCount;

    @Column(name = "bookmark_count", columnDefinition = "bigint not null default 0")
    private Long bookmarkCount;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "directory_id")
    private Directory directory;

}
