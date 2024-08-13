package com.ssafy.getsbee.global.common.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Interaction {

    VIEW("VIEW", 1),
    LIKE("LIKE", 2),
    CREATE("CREATE", 3),
    COMMENT("COMMENT", 1),
    BOOKMARK("BOOKMARK", 2);

    private String eventType;
    private Integer eventValue;
}
