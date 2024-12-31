package com.ssafy.getsbee.domain.highlight.repository;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.HighlightLog;
import com.ssafy.getsbee.domain.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HighlightLogRepository extends JpaRepository<HighlightLog, Long> {

    @Query("SELECT hl FROM HighlightLog hl WHERE hl.id = :id")
    Optional<HighlightLog> findByHighlightId(Long id);


    List<HighlightLog> findAllByPost(Post post);
}
