package com.ssafy.getsbee.domain.directory.entity;

import com.ssafy.getsbee.domain.follow.entity.Follow;
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

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.CascadeType.*;
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

    @Column(nullable = false)
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

    @OneToMany(mappedBy = "directory", cascade = REMOVE)
    private List<Post> posts = new ArrayList<>();

    // 나를 팔로우 하는 Follow 관계
    @OneToMany(mappedBy = "followedDirectory", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Follow> followedFollows = new ArrayList<>();

    @Builder
    public Directory(String name, int depth, Directory prevDirectory, Directory nextDirectory,
                     Directory parentDirectory, Member member, Boolean isDeleted) {
        this.name = name;
        this.depth = depth;
        this.prevDirectory = prevDirectory;
        this.nextDirectory = nextDirectory;
        this.parentDirectory = parentDirectory;
        this.member = member;
        this.isDeleted = isDeleted;
    }

    public void changeName(String newName) {
        this.name = newName;
    }

    public void changeDirectoryInfo(String name, int depth, Directory prevDirectory, Directory nextDirectory,
                                    Directory parentDirectory) {
        this.name = name;
        this.depth = depth;
        this.prevDirectory = prevDirectory;
        this.nextDirectory = nextDirectory;
        this.parentDirectory = parentDirectory;
    }

    public void setNextDirectory(Directory nextDirectory) {
        this.nextDirectory = nextDirectory;
    }

    public void setPrevDirectory(Directory prevDirectory) {
        this.prevDirectory = prevDirectory;
    }

}
