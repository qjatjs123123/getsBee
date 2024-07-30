package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.request.TokenRequest;
import com.ssafy.getsbee.domain.auth.dto.response.AccessTokenResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    AccessTokenResponse login(LoginRequest request, HttpServletResponse response);
    AccessTokenResponse reissueToken(TokenRequest request, HttpServletResponse response, String refreshToken);
    void logout(TokenRequest request, String refreshToken);
}
