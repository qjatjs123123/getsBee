package com.ssafy.getsbee.global.error.exception;

import com.ssafy.getsbee.global.error.ErrorCode;

import static com.ssafy.getsbee.global.error.ErrorCode._FORBIDDEN;

public class ForbiddenException extends BaseException {

    public ForbiddenException() {
        super(_FORBIDDEN, _FORBIDDEN.getMessage());
    }

    public ForbiddenException(String message) {
        super(_FORBIDDEN, message);
    }

    public ForbiddenException(ErrorCode errorCode) {
        super(errorCode, errorCode.getMessage());
    }
}
