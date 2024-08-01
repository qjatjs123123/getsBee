package com.ssafy.getsbee.domain.highlight.repository;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HighlightRepository extends JpaRepository<Highlight, Long> {

    Optional<Highlight> findById(Long id);
}
