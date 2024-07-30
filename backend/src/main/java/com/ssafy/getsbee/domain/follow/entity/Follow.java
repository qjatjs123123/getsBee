package com.ssafy.getsbee.domain.follow.entity;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.global.common.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import static jakarta.persistence.FetchType.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE follow SET is_deleted = true WHERE follow_id = ?")
@Where(clause = "is_deleted = false")
public class Follow extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "following_member_id", nullable = false)
    private Member followingMemberId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "followed_member_id", nullable = false)
    private Member followedMemberId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "followed_directory_id", nullable = false)
    private Directory followedDirectoryId;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;
}
