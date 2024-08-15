package com.ssafy.getsbee.domain.bookmark.service;

import com.ssafy.getsbee.domain.bookmark.dto.response.BookmarkResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final MemberService memberService;
    private final DirectoryRepository directoryRepository;

    @Override
    public BookmarkResponse findBookmarkDirectory(Long memberId) {
        Directory directory = directoryRepository.findByMemberAndName(memberService.findById(memberId), BOOKMARK)
                .orElseThrow(() -> new BadRequestException(DIRECTORY_NOT_FOUND));
        return BookmarkResponse.of(directory);
    }
}
