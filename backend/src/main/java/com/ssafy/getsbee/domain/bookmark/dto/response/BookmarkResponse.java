package com.ssafy.getsbee.domain.bookmark.dto.response;

import com.ssafy.getsbee.domain.directory.entity.Directory;

public record BookmarkResponse(
        Long directoryId
) {
    public static BookmarkResponse of(Directory directory) {
        return new BookmarkResponse(directory.getId());
    }
}
