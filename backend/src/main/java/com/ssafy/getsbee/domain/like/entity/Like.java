package com.ssafy.getsbee.domain.like.entity;

import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "likes")
@SQLDelete(sql = "UPDATE likes SET is_deleted = true WHERE like_id = ?")
@SQLRestriction("is_deleted = false")
public class Like extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public Like(Long id, Boolean isDeleted, Member member, Post post) {
        this.id = id;
        this.isDeleted = isDeleted;
        this.member = member;
        this.post = post;
    }

    public static Like of(Member member, Post post) {
        return Like.builder()
                .isDeleted(false)
                .member(member)
                .post(post)
                .build();
    }
}
