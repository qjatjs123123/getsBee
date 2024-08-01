package com.ssafy.getsbee.domain.follow.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.follow.entity.Follow;
import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import java.util.List;

public interface FollowService {

    void createFollow(Member member, Directory directory);

    void DeleteFollow(Follow follow);
}
