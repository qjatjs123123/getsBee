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
                .message(ResponseMessage.SUCCESS.getActualMessage())
                .code(null)
                .isSuccess(true)
                .data(data)
                .build();
    }

    public static <T> ApiResponse<T> onFailure(ErrorCode errorCode) {
        return ApiResponse.<T>builder()
                .status(errorCode.getHttpStatus().value())
                .message(errorCode.getMessage())
                .code(errorCode.getCode())
                .isSuccess(false)
                .data(null)
                .build();
    }

    public static JSONObject jsonOf(ErrorCode errorCode) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("status", errorCode.getHttpStatus().value());
        jsonObject.put("message", errorCode.getMessage());
        jsonObject.put("code", errorCode.getCode());
        jsonObject.put("success", false);
        jsonObject.put("timestamp", LocalDateTime.now());
        return jsonObject;
    }
}
