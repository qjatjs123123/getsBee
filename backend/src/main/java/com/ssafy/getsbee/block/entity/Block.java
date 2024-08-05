package com.ssafy.getsbee.block.entity;

import com.ssafy.getsbee.domain.member.entity.Member;
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
@SQLDelete(sql = "UPDATE block SET is_deleted = true WHERE block_id = ?")
@SQLRestriction("is_deleted = false")
public class Block {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "block_id")
    private Long id;

    @Column(length = 2083, nullable = false)
    private String domain;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Block(Long id, String domain, Boolean isDeleted, Member member) {
        this.id = id;
        this.domain = domain;
        this.isDeleted = isDeleted;
        this.member = member;
    }
}
