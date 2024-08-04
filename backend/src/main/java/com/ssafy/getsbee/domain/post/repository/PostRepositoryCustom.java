package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface PostRepositoryCustom {

    Slice<Post> findAllByMemberId(Long memberId, Long cursor, Pageable pageable);

    Slice<Post> findAllByDirectories(List<Directory> directories, Long cursor, Pageable pageable);

    Slice<Post> findAllByDirectoryId(Long directoryId, Long cursor, Pageable pageable);
}