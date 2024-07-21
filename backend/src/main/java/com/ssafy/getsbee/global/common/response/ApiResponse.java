package com.ssafy.getsbee.global.common.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.getsbee.global.error.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class ApiResponse<T> {

    private final int status;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final String code;
    private final Boolean isSuccess;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private final T data;
    private final String timestamp;

    @Builder
    public ApiResponse(int status, String code, Boolean isSuccess, String message, T data) {
        this.status = status;
        this.code = code;
        this.isSuccess = isSuccess;
        this.message = message;
        this.data = data;
        this. timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }

    public static <T> ApiResponse<T> onSuccess(int status, T data) {
        return ApiResponse.<T>builder()
                .status(status)
                .code(null)
                .isSuccess(true)
                .message(ResponseMessage.SUCCESS.getActualMessage())
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> onFailure(ErrorCode errorCode) {
        return ApiResponse.<T>builder()
                .status(errorCode.getHttpStatus().value())
                .code(errorCode.getCode())
                .isSuccess(false)
                .message(errorCode.getMessage())
                .data(null)
                .build();
    }

    public static JSONObject jsonOf(ErrorCode errorCode) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("timestamp", LocalDateTime.now());
        jsonObject.put("success", false);
        jsonObject.put("message", errorCode.getMessage());
        jsonObject.put("status", errorCode.getHttpStatus().value());
        jsonObject.put("code", errorCode.getCode());
        return jsonObject;
    }
}
