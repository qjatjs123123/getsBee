package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
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

    @Override
    public List<DirectoryResponse> findAllByMember(Member member) {
        List<Directory> directories = directoryRepository.findAllByMember(member);
//        if(SecurityUtil.getCurrentMemberId() != member.getId()){
//            filterDirectoriesByAuth(directories);
//        }
        return assembleDirectories(directories);
    }

    @Override
    public List<DirectoryResponse> modifyDirectories(List<DirectoryRequest> directoryRequests) {
        Long memberId = directoryRequests.get(0).memberId();
        Member member = memberRepository.getReferenceById(memberId);
        List<Directory> existingDirectories = directoryRepository.findAllByMember(member);

        HashMap<String, Long> tempIdToId = new HashMap<>();

        // ADD
        for(DirectoryRequest DR : directoryRequests){
            if(DR.directoryId().startsWith("T")){
                Directory newDirectory = directoryRepository.createNewDirectoryForMember(member, DR.name());
                tempIdToId.put(DR.directoryId(), newDirectory.getId());
            }
        }

        //DELETE
        List<Long> requestDirectoryIds = directoryRequests.stream()
                .filter(dr -> !dr.directoryId().startsWith("T"))
                .map(dr -> Long.parseLong(dr.directoryId()))
                .toList();

        for(Directory directory : existingDirectories){
            if(!requestDirectoryIds.contains(directory.getId())){
                directoryRepository.delete(directory);
            }
        }

        // MODIFY
        for (DirectoryRequest DR : directoryRequests) {
            if (!DR.directoryId().startsWith("T")) {
                Long directoryId = Long.parseLong(DR.directoryId());
                Directory existingDirectory = directoryRepository.findDirectoryById(directoryId);

                // prevDirectoryId 설정
                Long newPrevDirectoryId;
                if(DR.prevDirectoryId()==null)  newPrevDirectoryId = null;
                else if (DR.prevDirectoryId().startsWith("T")){
                    newPrevDirectoryId = tempIdToId.get(DR.prevDirectoryId());
                }else{
                    newPrevDirectoryId = Long.parseLong(DR.prevDirectoryId());
                }

                //nextDirectoryId 설정
                Long newNextDirectoryId;
                if(DR.nextDirectoryId()==null)  newNextDirectoryId = null;
                else if (DR.nextDirectoryId().startsWith("T")){
                    newNextDirectoryId = tempIdToId.get(DR.nextDirectoryId());
                }else{
                    newNextDirectoryId = Long.parseLong(DR.nextDirectoryId());
                }

                // parentDirectoryId 설정
                Long newParentDirectoryId;
                if (DR.parentDirectoryId() == null) {
                    newParentDirectoryId = null;
                } else if (DR.parentDirectoryId().startsWith("T")) {
                    newParentDirectoryId = tempIdToId.get(DR.parentDirectoryId());
                } else {
                    newParentDirectoryId = Long.parseLong(DR.parentDirectoryId());
                }

                // 변경사항 확인 및 수정
                boolean isModified = false;

                if (!existingDirectory.getName().equals(DR.name()) ||
                        existingDirectory.getDepth() != DR.depth() ||
                        (existingDirectory.getPrevDirectory() != null && !existingDirectory.getPrevDirectory().getId().equals(newPrevDirectoryId)) ||
                        (existingDirectory.getPrevDirectory() == null && newPrevDirectoryId != null) ||
                        (existingDirectory.getNextDirectory() != null && !existingDirectory.getNextDirectory().getId().equals(newNextDirectoryId)) ||
                        (existingDirectory.getNextDirectory() == null && newNextDirectoryId != null) ||
                        (existingDirectory.getParentDirectory() != null && !existingDirectory.getParentDirectory().getId().equals(newParentDirectoryId)) ||
                        (existingDirectory.getParentDirectory() == null && newParentDirectoryId != null)) {

                    existingDirectory.changeDirectoryInfo(
                            DR.name(),
                            DR.depth(),
                            newPrevDirectoryId != null ? directoryRepository.findDirectoryById(newPrevDirectoryId) : null,
                            newNextDirectoryId != null ? directoryRepository.findDirectoryById(newNextDirectoryId) : null,
                            newParentDirectoryId != null ? directoryRepository.findDirectoryById(newParentDirectoryId) : null
                    );
                    isModified = true;
                }

                if (isModified) {
                    directoryRepository.save(existingDirectory);
                }
            }
        }

        return assembleDirectories(directoryRepository.findAllByMember(member));

    }

    @Override
    public Directory findTemporaryDirectoryByMember(Member member) {
        return directoryRepository.findTemporaryDirectoryByMember(member);
    }

    @Override
    public Directory FindRootDirectoryByMember(Member member) {
        return directoryRepository.findRootDirectoryByMember(member);
    }

    @Override
    public Directory FindBookmarkDirectoryByMember(Member member) {
        return directoryRepository.findBookmarkDirectoryByMember(member);
    }

    @Override
    @Transactional
    public void createDefaultDirectoriesForMember(Member member) {
        directoryRepository.createDefaultDirectoriesForMember(member);
    }

    private void filterDirectoriesByAuth(List<Directory> directories) {
        directories.removeIf(directory -> directory.getDepth() == 1 && (directory.getName().equals("Temporary") ||
                directory.getName().equals("Bookmark")));
    }

    private List<DirectoryResponse> assembleDirectories(List<Directory> directories) {
        Map<Long, DirectoryResponse> directoryMap = new HashMap<>();

        for (Directory directory : directories) {
            if(directory.getDepth()==0) continue;
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
        //정렬
        sortDirectories(responses);
        return responses;
    }

    private void sortDirectories(List<DirectoryResponse> directories) {
        List<DirectoryResponse> sorted = new ArrayList<>();
        if(directories == null || directories.isEmpty()) return;
        DirectoryResponse first = directories.stream()
                .filter(d -> d.prevDirectoryId() == null)
                .findFirst()
                .orElseThrow(() -> new BadRequestException(DIRECTORY_NOT_FOUND));

        sorted.add(first);

        DirectoryResponse current = first;

        //depth 1 정렬
        while (current.nextDirectoryId() != null) {
            final Long nextId = current.nextDirectoryId();
            current = directories.stream()
                    .filter(d -> d.directoryId().equals(nextId))
                    .findFirst()
                    .orElseThrow(() -> new BadRequestException(NEXT_DIRECTORY_NOT_FOUND));
            sorted.add(current);
        }

        //depth 2 정렬
        for (DirectoryResponse directory : sorted) {
            sortDirectories(directory.children());
        }

        directories.clear();
        directories.addAll(sorted);
    }
}