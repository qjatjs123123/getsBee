package com.ssafy.getsbee.domain.bookmark.controller;

import com.ssafy.getsbee.domain.bookmark.dto.response.BookmarkResponse;
import com.ssafy.getsbee.domain.bookmark.service.BookmarkService;
import com.ssafy.getsbee.global.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @GetMapping("/me")
    public BookmarkResponse showMyBookmarkDirectory() {
        return bookmarkService.findBookmarkDirectory(SecurityUtil.getCurrentMemberId());
    }
}
