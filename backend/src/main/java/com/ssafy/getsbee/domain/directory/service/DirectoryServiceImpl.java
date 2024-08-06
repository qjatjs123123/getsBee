package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.dto.response.DirectorySearchResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.DirectoryDocument;
import com.ssafy.getsbee.domain.directory.repository.DirectoryElasticRepository;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
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
    private final DirectoryElasticRepository directoryElasticRepository;

    private final int ROOT_DEPTH = 0;
    private final PostRepository postRepository;
    private final FollowRepository followRepository;

    @Override
    public List<DirectoryResponse> findAllByMember(Member member) {
        List<Directory> directories = directoryRepository.findAllByMember(member);
//        if(!SecurityUtil.getCurrentMemberId().equals(member.getId())){
//            filterDirectoriesByAuth(directories);
//        }
        filterDirectoriesByAuth(member.getId(), assembleDirectories(directories));
        return assembleDirectories(directories);
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
                System.out.println("id: " + DR.directoryId());
                Directory newDirectory = directoryRepository.createNewDirectoryForMember(member, DR.name());
                tempIdToId.put(DR.directoryId(), newDirectory.getId());
                System.out.println("new Directory Id: " + newDirectory.getId()) ;
                //TODO : 여기서 디렉토리 생성됨
                directoryElasticService.saveDirectoryDocument(newDirectory);
            }
        }

        // DELETE
        List<Long> requestDirectoryIds = directoryRequests.stream()
                .filter(dr -> !dr.directoryId().startsWith("T"))
                .map(dr -> Long.parseLong(dr.directoryId()))
                .toList();

        existingDirectories.forEach(directory -> System.out.println(directory.getId()));

        System.out.println("requestDirectoryIds: " + requestDirectoryIds);


        for(Directory directory : existingDirectories){
            if(directory.getDepth()==ROOT_DEPTH) continue;
            if(!requestDirectoryIds.contains(directory.getId())){
                if(directory.getName().equals("Bookmark") || directory.getName().equals("Temporary")||
                        directory.getName().equals("Root")) {
                    //TODO : 검증 로직 수정
                    continue;
                }
                //TODO : 여기서 삭제됨
                System.out.println("delete directory: " + directory.getId());
                directoryElasticService.deleteDirectoryDocument(directory);
                directoryRepository.delete(directory);
            }
        }

        // MODIFY
        for (DirectoryRequest DR : directoryRequests) {
//            if(DR.directoryId().startsWith("T")) continue;
            System.out.println("checking modify: " + DR.directoryId());
            Long newDirectoryId = getNewDirectoryId(DR.directoryId(), tempIdToId);
            Long newPrevDirectoryId = getNewDirectoryId(DR.prevDirectoryId(), tempIdToId);
            Long newNextDirectoryId = getNewDirectoryId(DR.nextDirectoryId(), tempIdToId);
            Long newParentDirectoryId = getNewDirectoryId(DR.parentDirectoryId(), tempIdToId);
            System.out.println("checking modify: " + newDirectoryId);

            Directory existingDirectory = directoryRepository.findDirectoryById(newDirectoryId);

            // 변경사항 확인 및 수정
            if (isDirectoryChanged(existingDirectory, DR, newPrevDirectoryId, newNextDirectoryId, newParentDirectoryId)) {
                existingDirectory.changeDirectoryInfo(
                        DR.name(),
                        DR.depth(),
                        newPrevDirectoryId != null ? directoryRepository.findDirectoryById(newPrevDirectoryId) : null,
                        newNextDirectoryId != null ? directoryRepository.findDirectoryById(newNextDirectoryId) : null,
                        newParentDirectoryId != null ? directoryRepository.findDirectoryById(newParentDirectoryId) : null
                );
                directoryRepository.save(existingDirectory);
            }
        }


//        return null;
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
        Slice<DirectoryDocument> directoryDocuments = directoryElasticRepository.findAllByDirectoryIdLessThanAndDirectoryNameIsLikeOrderByDirectoryIdDesc(cursor, query, pageable);

        List<DirectorySearchResponse> responses = directoryDocuments.getContent().stream()
                .map(this::makeDirectoryResponseByDirectoryDocument)
                .collect(Collectors.toList());

        return new SliceImpl<>(responses, pageable, directoryDocuments.hasNext());
    }

    private DirectorySearchResponse makeDirectoryResponseByDirectoryDocument(DirectoryDocument document) {
        Directory directory = directoryRepository.findDirectoryById(document.getDirectoryId());
        DirectorySearchResponse.Directory directoryInfo = DirectorySearchResponse.Directory.builder()
                .directoryId(document.getDirectoryId())
                .directoryName(findFullNameByDirectory(directory))
                .postNumber(postRepository.countPostsByDirectory(directory))
                .build();

        Member member = memberRepository.findById(document.getMemberId())
                .orElseThrow(()->new NotFoundException(MEMBER_NOT_FOUND));

        DirectorySearchResponse.Member memberInfo = DirectorySearchResponse.Member.builder()
                .memberId(member.getId())
                .memberName(member.getName())
                .memberPicture(member.getPicture())
                .build();

        DirectorySearchResponse.Follow followInfo = DirectorySearchResponse.Follow.builder()
                .isFollowedByCurrentUser(followRepository.findByFollowingMemberAndFollowedDirectory(member, directory)
                        .isPresent())
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

        System.out.println("directories: " + directories.toString());
        for (Directory directory : directories) {
            if (directory.getDepth() == 0) continue;
            if (directory.getDepth() == 2) directory.changeName(directory.getName());
            DirectoryResponse response = DirectoryResponse.fromEntity(directory);
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

        // 정렬
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
            //TODO : 여기 이름 바뀜
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