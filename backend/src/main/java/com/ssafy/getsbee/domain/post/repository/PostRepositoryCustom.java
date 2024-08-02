package com.ssafy.getsbee.domain.post.repository;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {

    Page<Post> findAllByMemberId(Long memberId, Pageable pageable);

    Page<Post> findAllByDirectories(List<Directory> directories, Pageable pageable);

    Page<Post> findAllByDirectoryId(Long directoryId, Pageable pageable);
}
