package com.ssafy.getsbee.domain.auth.controller;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.response.AccessTokenResponse;
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
    public AccessTokenResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
