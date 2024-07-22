package com.ssafy.getsbee.global.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResponseMessage {

    SUCCESS("Request Successful"),
    FAIL("Request failed");

    private final String actualMessage;
}
