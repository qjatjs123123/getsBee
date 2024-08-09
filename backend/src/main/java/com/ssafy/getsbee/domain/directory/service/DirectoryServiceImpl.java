package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.dto.response.DirectorySearchResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryInfoResponse;
import com.ssafy.getsbee.domain.follow.entity.Follow;
import com.ssafy.getsbee.domain.follow.repository.FollowRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.NotFoundException;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DirectoryServiceImpl implements DirectoryService {

    private final DirectoryRepository directoryRepository;
    private final MemberRepository memberRepository;
    private final DirectoryElasticService directoryElasticService;

    private final int ROOT_DEPTH = 0;
    private final PostRepository postRepository;
    private final FollowRepository followRepository;

    @Override
    public List<DirectoryResponse> findAllByMember(Member member) {
        List<Directory> directories = directoryRepository.findAllByMember(member);
        List<DirectoryResponse> directoriesResponse = assembleDirectories(directories);
        filterDirectoriesByAuth(member.getId(), directoriesResponse);
        return directoriesResponse;
    }

    @Override
    @Transactional
    public List<DirectoryResponse> modifyDirectories(List<DirectoryRequest> directoryRequests) {

        Long memberId = directoryRequests.get(0).memberId();
         if(!SecurityUtil.getCurrentMemberId().equals(memberId)) throw new NotFoundException(MEMBER_NOT_FOUND);
        Member member = memberRepository.getReferenceById(memberId);
        List<Directory> existingDirectories = directoryRepository.findAllByMember(member);

        HashMap<String, Long> tempIdToId = new HashMap<>();

        // ADD
        for(DirectoryRequest DR : directoryRequests){
            if(DR.directoryId().startsWith("T")){
                Directory newDirectory = directoryRepository.createNewDirectoryForMember(member, DR.name());
                tempIdToId.put(DR.directoryId(), newDirectory.getId());
                directoryElasticService.saveDirectoryDocument(newDirectory);
            }
        }

        // DELETE
        List<Long> requestDirectoryIds = directoryRequests.stream()
                .filter(dr -> !dr.directoryId().startsWith("T"))
                .map(dr -> Long.parseLong(dr.directoryId()))
                .toList();

        for(Directory directory : existingDirectories){
            if(directory.getDepth()==ROOT_DEPTH) continue;
            if(!requestDirectoryIds.contains(directory.getId())){
                if(directory.getName().equals("Bookmark") || directory.getName().equals("Temporary")||
                        directory.getName().equals("Root")) {
                    continue;
                }
                directoryElasticService.deleteDirectoryDocument(directory);
                directoryRepository.delete(directory);
            }
        }

        // MODIFY
        for (DirectoryRequest DR : directoryRequests) {
            Long newDirectoryId = getNewDirectoryId(DR.directoryId(), tempIdToId);
            Long newPrevDirectoryId = getNewDirectoryId(DR.prevDirectoryId(), tempIdToId);
            Long newNextDirectoryId = getNewDirectoryId(DR.nextDirectoryId(), tempIdToId);
            Long newParentDirectoryId = getNewDirectoryId(DR.parentDirectoryId(), tempIdToId);

            Directory existingDirectory = findById(newDirectoryId);

            // 변경사항 확인 및 수정
            if (isDirectoryChanged(existingDirectory, DR, newPrevDirectoryId, newNextDirectoryId, newParentDirectoryId)) {
                existingDirectory.changeDirectoryInfo(
                        DR.name(),
                        DR.depth(),
                        newPrevDirectoryId != null ? findById(newPrevDirectoryId) : null,
                        newNextDirectoryId != null ? findById(newNextDirectoryId): null,
                        newParentDirectoryId != null ? findById(newParentDirectoryId): null
                );
                directoryRepository.save(existingDirectory);
            }
        }

        return assembleDirectories(directoryRepository.findAllByMember(member));
    }

    @Override
    @Transactional
    public void createDefaultDirectoriesForMember(Member member) {
        directoryRepository.createDefaultDirectoriesForMember(member);
    }

    @Override
    public String findFullNameByDirectory(Directory directory) {
        if(directory.getDepth()==1) return directory.getName();
        return directory.getParentDirectory().getName() + " / " +directory.getName();
    }

    @Override
    @Transactional
    public Slice<DirectorySearchResponse> showDirectoriesBySearch(String query, Pageable pageable, Long cursor) {
        Slice<Long> directoryDocumentIds = directoryElasticService.findByKeyword(query, pageable, cursor);

        List<DirectorySearchResponse> responses = directoryDocumentIds.getContent().stream()
                .map(this::makeDirectoryResponseByDirectoryDocument)
                .collect(Collectors.toList());

        return new SliceImpl<>(responses, pageable, directoryDocumentIds.hasNext());
    }

    @Override
    public DirectoryInfoResponse showDirectoryInfo(Long directoryId) {
        Directory directory = directoryRepository.findDirectoryById(directoryId).orElseThrow(()->new BadRequestException(DIRECTORY_NOT_FOUND));
        Member member = directory.getMember();
        Long postCount = postRepository.countPostsByDirectory(directory);
        Member currentMember = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(()->new BadRequestException(MEMBER_NOT_FOUND));

        return DirectoryInfoResponse.from(member, directory, postCount, followRepository.findByFollowingMemberAndFollowedDirectory(currentMember, directory)
                .isPresent());
    }

    private Directory findById(Long directoryId) {
        return directoryRepository.findDirectoryById(directoryId)
                .orElseThrow(()->new BadRequestException(DIRECTORY_NOT_FOUND));
    }

    private DirectorySearchResponse makeDirectoryResponseByDirectoryDocument(Long documentId) {
        Directory directory = findById(documentId);
        DirectorySearchResponse.Directory directoryInfo = DirectorySearchResponse.Directory.builder()
                .directoryId(documentId)
                .directoryName(findFullNameByDirectory(directory))
                .postNumber(postRepository.countPostsByDirectory(directory))
                .build();

        Member member = directory.getMember();

        DirectorySearchResponse.Member memberInfo = DirectorySearchResponse.Member.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .memberPicture(member.getPicture())
                .build();

        Follow follow = followRepository.findByFollowingMemberAndFollowedDirectory(member, directory)
                .orElse(null);

        DirectorySearchResponse.Follow followInfo = DirectorySearchResponse.Follow.builder()
                .followId(follow != null ? follow.getId() : null)
                .isFollowedByCurrentUser(follow != null)
                .followCount(followRepository.countDirectoryFollowers(directory))
                .build();

        return DirectorySearchResponse.builder()
                .directory(directoryInfo)
                .member(memberInfo)
                .follow(followInfo)
                .build();
    }

    private void filterDirectoriesByAuth(Long memberId, List<DirectoryResponse> directoryResponses) {
        if(SecurityUtil.getCurrentMemberId().equals(memberId)) return;
        directoryResponses.removeIf(directory -> directory.depth() == 1 && (directory.name().equals("Temporary") ||
                directory.name().equals("Bookmark")));
    }

    private List<DirectoryResponse> assembleDirectories(List<Directory> directories) {
        Map<Long, DirectoryResponse> directoryMap = new HashMap<>();

        for (Directory directory : directories) {
            if (directory.getDepth() == 0) continue;
            if (directory.getDepth() == 2) directory.changeName(directory.getName());
            Long postCount = postRepository.countPostsByDirectory(directory);
            DirectoryResponse response = DirectoryResponse.fromEntity(directory, postCount);
            directoryMap.put(directory.getId(), response);
        }

        List<DirectoryResponse> responses = new ArrayList<>();

        for (DirectoryResponse response : directoryMap.values()) {
            if (response.depth() == 1) {
                responses.add(response);
            } else {
                DirectoryResponse parent = directoryMap.get(response.parentDirectoryId());
                if (parent != null) {
                    parent.children().add(response);
                }
            }
        }

        sortDirectories(responses);
        return responses;
    }

    private void sortDirectories(List<DirectoryResponse> directories) {
        if (directories == null || directories.isEmpty()) return;

        List<DirectoryResponse> sorted = new ArrayList<>();
        DirectoryResponse first = directories.stream()
                .filter(d -> d.prevDirectoryId() == null)
                .findFirst()
                .orElseThrow(() -> new BadRequestException(DIRECTORY_NOT_FOUND));

        sorted.add(first);

        DirectoryResponse current = first;

        // depth 1 정렬
        while (current.nextDirectoryId() != null) {
            final Long nextId = current.nextDirectoryId();
            current = directories.stream()
                    .filter(d -> d.directoryId().equals(nextId))
                    .findFirst()
                    .orElseThrow(() -> new BadRequestException(NEXT_DIRECTORY_NOT_FOUND));
            sorted.add(current);
        }

        // depth 2 정렬
        for (DirectoryResponse directory : sorted) {
            sortDirectories(directory.children());
        }

        directories.clear();
        directories.addAll(sorted);
    }

    private Long getNewDirectoryId(String directoryId, HashMap<String, Long> tempIdToId) {
        if (directoryId == null) {
            return null;
        } else if (directoryId.startsWith("T")) {
            return tempIdToId.get(directoryId);
        } else {
            return Long.parseLong(directoryId);
        }
    }

    private boolean isDirectoryChanged(Directory existingDirectory, DirectoryRequest DR, Long newPrevDirectoryId,
                                       Long newNextDirectoryId, Long newParentDirectoryId) {
        if (existingDirectory != null && !existingDirectory.getName().equals(DR.name())) {
            directoryElasticService.updateDirectoryDocument(existingDirectory);
            return true;
        }

        if (!existingDirectory.getDepth().equals(DR.depth())) {
            return true;
        }

        Long existingPrevDirectoryId = existingDirectory.getPrevDirectory() != null ?
                existingDirectory.getPrevDirectory().getId() : null;
        if (!Objects.equals(existingPrevDirectoryId, newPrevDirectoryId)) {
            return true;
        }

        Long existingNextDirectoryId = existingDirectory.getNextDirectory() != null ?
                existingDirectory.getNextDirectory().getId() : null;
        if (!Objects.equals(existingNextDirectoryId, newNextDirectoryId)) {
            return true;
        }

        Long existingParentDirectoryId = existingDirectory.getParentDirectory() != null ?
                existingDirectory.getParentDirectory().getId() : null;

        return !Objects.equals(existingParentDirectoryId, newParentDirectoryId);
    }
}