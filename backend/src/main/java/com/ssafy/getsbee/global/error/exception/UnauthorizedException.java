package com.ssafy.getsbee.global.error.exception;

import com.ssafy.getsbee.global.error.ErrorCode;

import static com.ssafy.getsbee.global.error.ErrorCode._UNAUTHORIZED;

public class UnauthorizedException extends BaseException {

    public UnauthorizedException() {
        super(_UNAUTHORIZED, _UNAUTHORIZED.getMessage());
    }

    public UnauthorizedException(String message) {
        super(_UNAUTHORIZED, message);
    }

    public UnauthorizedException(ErrorCode errorCode) {
        super(errorCode, errorCode.getMessage());
    }
}
