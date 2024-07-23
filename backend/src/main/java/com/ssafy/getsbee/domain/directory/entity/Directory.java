package com.ssafy.getsbee.domain.directory.entity;

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
@SQLDelete(sql = "UPDATE directory SET is_deleted = true WHERE directory_id = ?")
@Where(clause = "is_deleted = false")
public class Directory extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "directory_id")
    private Long id;

    @Column(name = "name", columnDefinition = "varchar(20) not null")
    private String name;

    @Column(name = "depth", columnDefinition = "int not null")
    private int depth;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "prev_directory_id")
    private Directory prev;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "next_directory_id")
    private Directory next;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "parent_directory_id")
    private Directory parent;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "is_deleted", columnDefinition = "tinyint(1) not null default 0")
    private Boolean isDeleted;

    public void changeDirectoryInfo(String name, int depth, Directory prev, Directory next, Directory parent) {
        this.name = name;
        this.depth = depth;
        this.prev = prev;
        this.next = next;
        this.parent = parent;
    }
}
