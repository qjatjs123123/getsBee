package com.ssafy.getsbee.domain.member.dto.request;

import com.ssafy.getsbee.domain.interest.entity.Category;

import java.util.List;

public record MemberRequest(
        Integer birthYear,
        List<Category> category
) {
}
