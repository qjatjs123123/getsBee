package com.ssafy.getsbee.domain.auth.controller;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.request.TokenRequest;
import com.ssafy.getsbee.domain.auth.dto.response.AccessTokenResponse;
import com.ssafy.getsbee.domain.auth.service.AuthService;
import com.ssafy.getsbee.global.consts.StaticConst;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.getsbee.global.consts.StaticConst.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AccessTokenResponse login(@Valid @RequestBody LoginRequest request,
                                     HttpServletResponse response) {
        return authService.login(request, response);
    }

    @PostMapping("/reissue")
    public AccessTokenResponse reissue(@Valid @RequestBody TokenRequest request,
                                       @CookieValue(REFRESH_TOKEN) String refreshToken,
                                       HttpServletResponse response) {
        return authService.reissueToken(request, response, refreshToken);
    }

    @PostMapping("/logout")
    public void logout(@Valid @RequestBody TokenRequest request,
                       @CookieValue(REFRESH_TOKEN) String refreshToken) {
        authService.logout(request, refreshToken);
    }
}
