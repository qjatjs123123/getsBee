package com.ssafy.getsbee.domain.category.repository;

import com.ssafy.getsbee.domain.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
