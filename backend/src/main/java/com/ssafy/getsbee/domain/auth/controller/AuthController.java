package com.ssafy.getsbee.domain.auth.controller;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.request.TokenRequest;
import com.ssafy.getsbee.domain.auth.dto.response.LoginResponse;
import com.ssafy.getsbee.domain.auth.dto.response.TokenResponse;
import com.ssafy.getsbee.domain.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/reissue")
    public TokenResponse reissue(@Valid @RequestBody TokenRequest request) {
        return authService.reissueToken(request);
    }

    @PostMapping("/logout")
    public void logout(@Valid @RequestBody TokenRequest request) {
        authService.logout(request);
    }
}
