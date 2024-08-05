package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.entity.DirectoryDocument;
import com.ssafy.getsbee.domain.directory.repository.DirectoryElasticRepository;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.getsbee.global.error.ErrorCode.DIRECTORYDOCUMENT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class DirectoryElasticServiceImpl implements DirectoryElasticService {

    private final DirectoryElasticRepository directoryElasticRepository;

    @Override
    public void saveDirectoryDocument(Directory directory) {
        directoryElasticRepository.save(DirectoryDocument.builder().
                directoryId(directory.getId()).
                memberId(directory.getMember().getId()).
                directoryName(directory.getName()).
                build());
    }

    @Override
    public void deleteDirectoryDocument(Directory directory) {
        DirectoryDocument directoryDocument = directoryElasticRepository.findByDirectoryId(directory.getId())
                .orElseThrow(()-> new BadRequestException(DIRECTORYDOCUMENT_NOT_FOUND));

        directoryElasticRepository.delete(directoryDocument);
    }

    @Override
    public void updateDirectoryDocument(Directory directory) {
        DirectoryDocument directoryDocument = directoryElasticRepository.findByDirectoryId(directory.getId())
                .orElseThrow(()-> new BadRequestException(DIRECTORYDOCUMENT_NOT_FOUND));

        directoryDocument.changeDirectoryName(directory.getName());
        directoryElasticRepository.save(directoryDocument);
    }

    @Override
    public Slice<Long> findByKeyword(String keyword, Pageable pageable, Long directoryId) {
        Pageable pageable1 = PageRequest.ofSize(pageable.getPageSize() + 1);

        Page<DirectoryDocument> page = directoryElasticRepository
                .findAllByDirectoryIdLessThanAndDirectoryNameIsLikeOrderByDirectoryIdDesc(directoryId, keyword, pageable1);

        List<Long> directoryIds = new ArrayList<>();
        boolean hasNext;
        page.getContent().stream().map(DirectoryDocument::getDirectoryId).forEach(directoryIds::add);

        if(page.getTotalElements() == pageable.getPageSize() + 1) {
            hasNext = true;
            directoryIds.remove(directoryIds.size() - 1);
        }else hasNext = false;

        return new SliceImpl<>(directoryIds, pageable1, hasNext);
    }
}
