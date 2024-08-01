package com.ssafy.getsbee.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    /** Common */
    _INTERNAL_SERVER_ERROR(INTERNAL_SERVER_ERROR, "C000", "서버 에러, 관리자에게 문의 바랍니다."),
    _BAD_REQUEST(BAD_REQUEST, "C001", "잘못된 요청 입니다."),
    _UNAUTHORIZED(UNAUTHORIZED, "C002", "인증되지 않았습니다."),
    _FORBIDDEN(FORBIDDEN, "C003", "권한이 없습니다."),
    _NOT_FOUND(NOT_FOUND, "C004", "찾을 수 없습니다."),
    _METHOD_NOT_ALLOWED(METHOD_NOT_ALLOWED, "C005", "지원하지 않는 Http Method 입니다."),
    INVALID_INPUT_VALUE(BAD_REQUEST, "C006", "Invalid Input Value"),

    /** Auth */
    UNAUTHORIZED_ACCESS(UNAUTHORIZED, "AUTH000", "권한이 없습니다."),
    FORBIDDEN_USER(FORBIDDEN, "AUTH001", "권한이 없는 유저 입니다"),
    INVALID_TOKEN(BAD_REQUEST, "AUTH002", "유효하지 않은 토큰 입니다"),
    LOGIN_FAILED(UNAUTHORIZED, "AUTH003", "로그인에 실패했습니다"),
    INVALID_AUTH_TOKEN(UNAUTHORIZED, "AUTH004", "권한 정보가 없는 토큰 입니다"),
    INVALID_REFRESH_TOKEN(BAD_REQUEST, "AUTH005", "Refresh Token이 유효하지 않습니다"),
    REFRESH_TOKEN_NOT_FOUND(BAD_REQUEST, "AUTH006", "로그아웃 된 사용자입니다"),
    GOOGLE_SERVER_ERROR(BAD_REQUEST, "AUTH007", "Google Server 에러입니다."),
    INVALID_ID_TOKEN(UNAUTHORIZED, "AUTH008", "ID 토큰 검증에 실패했습니다."),


    /** Member */
    DUPLICATE_MEMBER(BAD_REQUEST, "MEMBER000", "이미 존재하는 E-mail 입니다."),
    MEMBER_NOT_FOUND(BAD_REQUEST, "MEMBER001", "해당 회원이 존재하지 않습니다."),

    /** Post */
    DUPLICATE_POST(BAD_REQUEST, "POST000", "이미 존재하는 포스트 입니다."),
    POST_NOT_FOUND(BAD_REQUEST, "POST001", "해당 포스트는 존재하지 않습니다."),
    INVALID_POST_REQUEST(BAD_REQUEST, "POST002", "잘못된 포스트 리스트 요청입니다."),

    /** Highlight */
    DUPLICATE_HIGHLIGHT(BAD_REQUEST, "HIGHLIGHT000", "이미 존재하는 하이라이트 입니다."),
    HIGHLIGHT_NOT_FOUND(BAD_REQUEST, "HIGHLIGHT001", "해당 하이라이트는 존재하지 않습니다."),

    /** Directory */
    DIRECTORY_NOT_FOUND(BAD_REQUEST, "DIR000", "해당 디렉토리를 찾을 수 없습니다."),
    NEXT_DIRECTORY_NOT_FOUND(BAD_REQUEST, "DIR001", "다음 디렉토리를 찾을 수 없습니다."),
    PREV_DIRECTORY_NOT_FOUND(BAD_REQUEST, "DIR002", "이전 디렉토리를 찾을 수 없습니다."),
    CANT_DELETE_DEFAULT_DIRECTORY(BAD_REQUEST, "DIR003", "기본 디렉토리는 삭제할 수 없습니다."),
    /** Category */

    /** Comment */
    COMMENT_NOT_FOUND(BAD_REQUEST, "COMMENT000", "해당 댓글을 찾을 수 없습니다."),

    /** Bookmark */
    DUPLICATE_BOOKMARK(BAD_REQUEST, "BOOKMARK000", "이미 존재하는 북마크 입니다."),
    BOOKMARK_NOT_FOUND(BAD_REQUEST, "BOOKMARK001", "해당 하이라이트는 존재하지 않습니다.");
    /** Like */

    /** Follow */

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
