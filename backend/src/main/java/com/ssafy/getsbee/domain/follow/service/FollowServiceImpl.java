package com.ssafy.getsbee.domain.follow.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.follow.dto.response.FollowDirectoryResponse;
import com.ssafy.getsbee.domain.follow.dto.response.HiveInfoResponse;
import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.NotFoundException;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.ssafy.getsbee.domain.follow.entity.Follow;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService{

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final DirectoryRepository directoryRepository;
    private final DirectoryService directoryService;
    private final PostRepository postRepository;

    @Override
    @Transactional
    public void createFollow(Long directoryId) {
        Directory directory = directoryRepository.findDirectoryById(directoryId).orElseThrow(()->new BadRequestException(DIRECTORY_NOT_FOUND));
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId).orElseThrow(
                ()->new BadRequestException(MEMBER_NOT_FOUND));

        if(directory.getDepth()==0 || Objects.equals(directory.getName(), "Temporary") || Objects.equals(directory.getName(), "Bookmark")) {
            throw new BadRequestException(WRONG_DIRECTORY_FOLLOW);
        }
        followRepository.createFollow(currentMember, directory);
    }

    @Override
    @Transactional
    public void deleteFollow(Long followId) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId).orElseThrow(
                ()->new NotFoundException(MEMBER_NOT_FOUND));
        Follow follow = followRepository.findById(followId).orElseThrow(
                ()->new NotFoundException(FOLLOW_NOT_FOUND));

        if(!follow.getFollowingMember().equals(currentMember)) throw new BadRequestException(UNFOLLOW_FAILED);
        followRepository.deleteById(followId);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FollowDirectoryResponse> findFollowingDirectories(Long memberId) { //내가 팔로우 중인
        List<Follow> follows = followRepository.findFollowingByMemberId(memberId);
        return follows.stream()
                .map(follow -> {
                    Member followedMember = memberRepository.findById(follow.getFollowedMember().getId())
                            .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
                    String fullDirectoryName = directoryService.findFullNameByDirectory(follow.getFollowedDirectory());
                    Long followCount = followRepository.countFollowByFollowedDirectory(follow.getFollowedDirectory());
                    Long postCount = postRepository.countPostsByDirectory(follow.getFollowedDirectory());
                    return FollowDirectoryResponse.from(follow, followedMember, fullDirectoryName, postCount, followCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<FollowDirectoryResponse> findFollowedDirectories(Long memberId) { //나를 팔로우 중인
        List<Follow> follows = followRepository.findFollowedByMemberId(memberId);
        return follows.stream()
                .map(follow -> {
                    Member followingMember = memberRepository.findById(follow.getFollowingMember().getId())
                            .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
                    String fullDirectoryName = directoryService.findFullNameByDirectory(follow.getFollowedDirectory());
                    Long followCount = followRepository.countFollowByFollowedDirectory(follow.getFollowedDirectory());
                    Long postCount = postRepository.countPostsByDirectory(follow.getFollowedDirectory());
                    return FollowDirectoryResponse.from(follow, followingMember, fullDirectoryName, postCount, followCount);
                })
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public HiveInfoResponse getHiveInfo(Long memberId) {
        return HiveInfoResponse.builder()
                .follower(countFollowers(memberId))
                .following(countFollowingDirectories(memberId))
                .postNumber(countPosts(memberId))
                .build();
    }

    private Long countFollowingDirectories(Long memberId) { //멤버가 팔로잉 중인 디렉토리 수
        Member currentMember = memberRepository.findById(memberId)
                .orElseThrow(()-> new NotFoundException(MEMBER_NOT_FOUND));
        return followRepository.countMemberFollowings(currentMember);
    }

    private Long countFollowers(Long memberId) { // 멤버의 디렉토리를 팔로우중인 유저의 수
        Member currentMember = memberRepository.findById(memberId)
                .orElseThrow(()-> new NotFoundException(MEMBER_NOT_FOUND));
        return followRepository.countMemberFollowers(currentMember);
    }

    private Long countPosts(Long memberId) { // 유저가 작성한 포스트 수
        Member currentMember = memberRepository.findById(memberId)
                .orElseThrow(()-> new NotFoundException(MEMBER_NOT_FOUND));
        return postRepository.countPostsByMember(currentMember);
    }
}
