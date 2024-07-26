package com.ssafy.getsbee.domain.highlight.repository;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HighlightRepository extends JpaRepository<Highlight, Long> {
}
