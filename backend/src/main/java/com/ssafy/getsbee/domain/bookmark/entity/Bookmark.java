package com.ssafy.getsbee.domain.bookmark.entity;

import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE bookmark SET is_deleted = true WHERE bookmark_id = ?")
//@Where(clause = "is_deleted = false")
public class Bookmark extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookmark_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @Builder
    public Bookmark(Long id, Member member, Post post, Boolean isDeleted) {
        this.id = id;
        this.member = member;
        this.post = post;
        this.isDeleted = isDeleted;
    }

    @Builder
    public Bookmark(Member member, Post post) {
        this.member = member;
        this.post = post;
        this.isDeleted = false;
    }

    public void changeBookmark() {
        this.isDeleted = !this.isDeleted;
    }
}