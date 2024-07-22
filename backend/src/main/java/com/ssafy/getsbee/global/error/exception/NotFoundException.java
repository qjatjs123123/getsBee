package com.ssafy.getsbee.global.error.exception;

import com.ssafy.getsbee.global.error.ErrorCode;

import static com.ssafy.getsbee.global.error.ErrorCode._NOT_FOUND;

public class NotFoundException extends BaseException {

    public NotFoundException() {
        super(_NOT_FOUND, _NOT_FOUND.getMessage());
    }

    public NotFoundException(String message) {
        super(_NOT_FOUND, message);
    }

    public NotFoundException(ErrorCode errorCode) {
        super(errorCode, errorCode.getMessage());
    }
}
