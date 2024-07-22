package com.ssafy.getsbee.domain.bookmark.repository;

import com.ssafy.getsbee.domain.bookmark.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
}
