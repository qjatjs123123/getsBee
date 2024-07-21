package com.ssafy.getsbee.global.error.exception;

import com.ssafy.getsbee.global.error.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BaseException extends RuntimeException {

    private final ErrorCode errorCode;
    private final String message;
}
