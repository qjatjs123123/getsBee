package com.ssafy.getsbee.domain.interest.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Optional;

@Getter
@AllArgsConstructor
public enum Category {
    POLITICS("POLITICS"),
    SOCIAL("SOCIAL"),
    CULTURE("CULTURE"),
    ECONOMY("ECONOMY"),
    IT("IT"),
    WORLD("WORLD"),
    SPORTS("SPORTS"),
    ENTERTAIN("ENTERTAIN"),
    HEALTH("HEALTH"),
    TRAVEL("TRAVEL"),
    EDUCATION("EDUCATION"),
    LIVING("LIVING"),
    BEAUTY("BEAUTY"),
    FASHION("FASHION"),
    SCIENCE("SCIENCE");

    private final String value;

    public static Optional<Category> findCategory(String message) {
        for (Category category : Category.values()) {
            if (message.contains(category.getValue())) {
                return Optional.of(category);
            }
        }
        return Optional.empty();
    }
}
