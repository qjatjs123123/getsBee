package com.ssafy.getsbee.global.error;

import com.ssafy.getsbee.global.error.exception.BaseException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.bind.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler{

    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ErrorCode handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error("handleMethodArgumentNotValidException", e);
        return _BAD_REQUEST;
    }

    @ExceptionHandler(BindException.class)
    protected ErrorCode handleBindException(BindException e) {
        log.error("handleBindException", e);
        return _BAD_REQUEST;
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    protected ErrorCode handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.error("handleMethodArgumentTypeMismatchException", e);
        return _BAD_REQUEST;
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ErrorCode handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("handleHttpRequestMethodNotSupportedException", e);
        return _METHOD_NOT_ALLOWED;
    }

    @ExceptionHandler(BaseException.class)
    protected ErrorCode handleBusinessException(final BaseException e) {
        log.error("BusinessException", e);
        return e.getErrorCode();
    }

    @ExceptionHandler(Exception.class)
    protected ErrorCode handleException(Exception e) {
        log.error("Exception", e);
        return _INTERNAL_SERVER_ERROR;
    }
}
