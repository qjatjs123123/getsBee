package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.member.entity.Member;

import java.util.List;

public interface DirectoryService {

    List<DirectoryResponse> findAllByMember(Member member);

    List<DirectoryResponse> modifyDirectories(List<DirectoryRequest> directoryRequests);

    Directory findTemporaryDirectoryByMember(Member member);

    Directory FindRootDirectoryByMember(Member member);

    Directory FindBookmarkDirectoryByMember(Member member);

    void createDefaultDirectoriesForMember(Member member);
}
