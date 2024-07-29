package com.ssafy.getsbee.global.error.jwt;

import com.ssafy.getsbee.global.error.FilterExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
            throws IOException {
        FilterExceptionHandler.setResponse(response, FORBIDDEN_USER);
    }
}
