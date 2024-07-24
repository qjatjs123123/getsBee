package com.ssafy.getsbee.global.error;

import com.ssafy.getsbee.global.common.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public class FilterExceptionHandler {

    public static void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(errorCode.getHttpStatus().value());
        response.getWriter().print(ApiResponse.jsonOf(errorCode));
    }
}
