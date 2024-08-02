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
    public void createFollow(Long directoryId) {
        Directory directory = directoryRepository.findDirectoryById(directoryId);
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId).orElseThrow(
                ()->new NotFoundException(MEMBER_NOT_FOUND));

        if(directory.getDepth()==0 || Objects.equals(directory.getName(), "Temporary") || Objects.equals(directory.getName(), "Bookmark")) {
            throw new BadRequestException(WRONG_DIRECTORY_FOLLOW);
        }
        followRepository.createFollow(currentMember, directory);
    }

    @Override
    public void deleteFollow(Long followId) {
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId).orElse(null);
        Follow follow = followRepository.findById(followId).orElseThrow(
                ()->new NotFoundException(FOLLOW_NOT_FOUND));

        if(!follow.getFollowingMember().equals(currentMember)) throw new BadRequestException(UNFOLLOW_FAILED);
        followRepository.deleteById(followId);
    }

    @Override
    public List<FollowDirectoryResponse> findFollowingDirectories() { //내가 팔로잉 중인 디렉토리 정보
        Long currentMember = SecurityUtil.getCurrentMemberId();
        List<Follow> follows = followRepository.findFollowingByMemberId(currentMember);

        return follows.stream()
                .map(f -> {
                    Member followedMember = memberRepository.findById(f.getFollowedMember().getId())
                            .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
                    return FollowDirectoryResponse.builder()
                            .directory(FollowDirectoryResponse.Directory.builder()
                                    .directoryId(f.getFollowedDirectory().getId())
                                    .directoryName(directoryService.findFullNameByDirectory(f.getFollowedDirectory()))
                                    .build())
                            .member(FollowDirectoryResponse.Member.builder()
                                    .memberId(followedMember.getId())
                                    .memberEmail(followedMember.getEmail())
                                    .picture(followedMember.getPicture())
                                    .build())
                            .follow(FollowDirectoryResponse.Follow.builder()
                                    .followId(f.getId())
                                    .build())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<FollowDirectoryResponse> findFollowedDirectories() { //내가 팔로잉 중인 디렉토리 정보
        Long currentMember = SecurityUtil.getCurrentMemberId();
        List<Follow> follows = followRepository.findFollowedByMemberId(currentMember);

        return follows.stream()
                .map(f -> {
                    Member followingMember = memberRepository.findById(f.getFollowingMember().getId())
                            .orElseThrow(() -> new NotFoundException(MEMBER_NOT_FOUND));
                    return FollowDirectoryResponse.builder()
                            .directory(FollowDirectoryResponse.Directory.builder()
                                    .directoryId(f.getFollowedDirectory().getId())
                                    .directoryName(directoryService.findFullNameByDirectory(f.getFollowedDirectory()))
                                    .build())
                            .member(FollowDirectoryResponse.Member.builder()
                                    .memberId(followingMember.getId())
                                    .memberEmail(followingMember.getEmail())
                                    .picture(followingMember.getPicture())
                                    .build())
                            .follow(FollowDirectoryResponse.Follow.builder()
                                    .followId(f.getId())
                                    .build())
                            .build();
                })
                .collect(Collectors.toList());
    }

    @Override
    public HiveInfoResponse getHiveInfo() {
        return HiveInfoResponse.builder()
                .follower(countFollowers())
                .following(countFollowingDirectories())
                .postNumber(countPosts())
                .build();
    }

    private Long countFollowingDirectories() { //멤버가 팔로잉 중인 디렉토리 수
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId)
                .orElseThrow(()-> new NotFoundException(MEMBER_NOT_FOUND));
        return followRepository.countMemberFollowings(currentMember);
    }

    private Long countFollowers() { // 멤버의 디렉토리를 팔로우중인 유저의 수
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId)
                .orElseThrow(()-> new NotFoundException(MEMBER_NOT_FOUND));
        return followRepository.countMemberFollowers(currentMember);
    }

    private Long countPosts() { // 유저가 작성한 포스트 수
        Long currentMemberId = SecurityUtil.getCurrentMemberId();
        Member currentMember = memberRepository.findById(currentMemberId)
                .orElseThrow(()-> new NotFoundException(MEMBER_NOT_FOUND));
        return postRepository.countPostsByMember(currentMember);
    }
}
