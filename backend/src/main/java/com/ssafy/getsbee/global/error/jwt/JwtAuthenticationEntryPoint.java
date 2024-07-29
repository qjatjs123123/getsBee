package com.ssafy.getsbee.global.error.jwt;

import com.ssafy.getsbee.global.error.FilterExceptionHandler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {
        FilterExceptionHandler.setResponse(response, UNAUTHORIZED_ACCESS);
    }
}
