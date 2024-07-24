package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import java.util.List;

public interface DirectoryService {

    List<DirectoryResponse> findDirectoriesByMemberId(Long memberId);
    List<DirectoryResponse> modifyDirectories(List<DirectoryRequest> directoryRequests);
    Long findTemporaryDirectoryIdByMemberId(Long memberId);
}
