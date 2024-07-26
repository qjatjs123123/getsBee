package com.ssafy.getsbee.global.error.exception;

import com.ssafy.getsbee.global.error.ErrorCode;

import static com.ssafy.getsbee.global.error.ErrorCode._BAD_REQUEST;

public class BadRequestException extends BaseException {

    public BadRequestException() {
        super(_BAD_REQUEST, _BAD_REQUEST.getMessage());
    }

    public BadRequestException(String message) {
        super(_BAD_REQUEST, message);
    }

    public BadRequestException(ErrorCode errorCode) {
        super(errorCode, errorCode.getMessage());
    }
}
