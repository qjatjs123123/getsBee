package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.request.TokenRequest;
import com.ssafy.getsbee.domain.auth.dto.response.LoginResponse;
import com.ssafy.getsbee.domain.auth.dto.response.TokenResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
    TokenResponse reissueToken(TokenRequest request);
    void logout(TokenRequest request);
}
