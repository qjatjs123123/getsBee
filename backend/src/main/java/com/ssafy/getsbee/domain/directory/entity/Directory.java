package com.ssafy.getsbee.domain.directory.entity;

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
@SQLDelete(sql = "UPDATE directory SET is_deleted = true WHERE directory_id = ?")
@SQLRestriction("is_deleted = false")
public class Directory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "directory_id")
    private Long id;

    @Column(length = 20, nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer depth;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "prev_directory_id")
    private Directory prevDirectory;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "next_directory_id")
    private Directory nextDirectory;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "parent_directory_id")
    private Directory parentDirectory;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    @Builder
    public Directory(Long id, String name, int depth, Directory prevDirectory, Directory nextDirectory,
                     Directory parentDirectory, Member member, Boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.depth = depth;
        this.prevDirectory = prevDirectory;
        this.nextDirectory = nextDirectory;
        this.parentDirectory = parentDirectory;
        this.member = member;
        this.isDeleted = isDeleted;
    }

    public void changeDirectoryInfo(String name, int depth, Directory prevDirectory, Directory nextDirectory,
                                    Directory parentDirectory) {
        this.name = name;
        this.depth = depth;
        this.prevDirectory = prevDirectory;
        this.nextDirectory = nextDirectory;
        this.parentDirectory = parentDirectory;
    }
}
