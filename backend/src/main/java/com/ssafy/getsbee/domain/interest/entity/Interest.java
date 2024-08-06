package com.ssafy.getsbee.domain.interest.entity;

import com.ssafy.getsbee.domain.member.entity.Member;
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
@SQLDelete(sql = "UPDATE interest SET is_deleted = true WHERE interest_id = ?")
@SQLRestriction("is_deleted = false")
public class Interest extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interest_id")
    private Long id;

    @Column(length = 2083, nullable = false)
    private String url;

    @Column(length = 13, nullable = false)
    @Enumerated(EnumType.STRING)
    Category category;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @Builder
    public Interest(Long id, String url, Category category, Boolean isDeleted, Member member) {
        this.id = id;
        this.url = url;
        this.category = category;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public static Interest of(Member member, Category category) {
        return Interest.builder()
                .category(category)
                .member(member)
                .isDeleted(false)
                .build();
    }
}
