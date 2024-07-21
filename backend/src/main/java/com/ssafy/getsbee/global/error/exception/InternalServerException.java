package com.ssafy.getsbee.global.error.exception;

import com.ssafy.getsbee.global.error.ErrorCode;

import static com.ssafy.getsbee.global.error.ErrorCode._INTERNAL_SERVER_ERROR;

public class InternalServerException extends BaseException {

    public InternalServerException() {
        super(_INTERNAL_SERVER_ERROR, _INTERNAL_SERVER_ERROR.getMessage());
    }

    public InternalServerException(String message) {
        super(_INTERNAL_SERVER_ERROR, message);
    }

    public InternalServerException(ErrorCode errorCode) {
        super(errorCode, errorCode.getMessage());
    }
}
