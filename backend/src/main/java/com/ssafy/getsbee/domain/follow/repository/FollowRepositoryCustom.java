package com.ssafy.getsbee.domain.follow.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.follow.entity.Follow;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepositoryCustom {

    void createFollow(Member member, Directory directory);

    Long countMemberFollowers(Member member);

    Long countMemberFollowings(Member member);

    Long countDirectoryFollowers(Directory directory);

    List<Directory> findFollowingDirectories(Member member);
}