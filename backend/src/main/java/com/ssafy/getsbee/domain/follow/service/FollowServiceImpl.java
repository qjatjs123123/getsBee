package com.ssafy.getsbee.domain.follow.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.follow.entity.Follow;
import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final FollowRepository followRepository;

    void createFollow(Member member, Directory directory) {
        followRepository.createFollow(member, directory);
    }

    void DeleteFollow(Follow follow) {
        followRepository.delete(follow);
    }
}
