package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.response.AccessTokenResponse;

public interface AuthService {

    AccessTokenResponse login(LoginRequest request);
}
