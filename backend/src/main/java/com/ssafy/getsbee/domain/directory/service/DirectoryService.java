package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.dto.response.DirectorySearchResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryInfoResponse;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface DirectoryService {

    List<DirectoryResponse> findAllByMember(Member member);

    List<DirectoryResponse> modifyDirectories(List<DirectoryRequest> directoryRequests);

    void createDefaultDirectoriesForMember(Member member);

    String findFullNameByDirectory(Directory directory);

    Slice<DirectorySearchResponse> showDirectoriesBySearch(String query, Pageable pageable, Long cursor);

    DirectoryInfoResponse showDirectoryInfo(Long directoryId);
}
