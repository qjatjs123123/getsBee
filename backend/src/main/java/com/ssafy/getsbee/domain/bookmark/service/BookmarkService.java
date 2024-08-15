package com.ssafy.getsbee.domain.bookmark.service;

import com.ssafy.getsbee.domain.bookmark.dto.response.BookmarkResponse;

public interface BookmarkService {

    BookmarkResponse findBookmarkDirectory(Long memberId);
}
