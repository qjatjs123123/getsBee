package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.request.TokenRequest;
import com.ssafy.getsbee.domain.auth.dto.response.AccessTokenResponse;
import com.ssafy.getsbee.domain.auth.entity.RefreshToken;
import com.ssafy.getsbee.domain.auth.repository.RefreshTokenRedisRepository;
import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.google.api.client.json.webtoken.JsonWebToken.*;
import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final DirectoryService directoryService;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final JwtUtil jwtUtil;
    private final GoogleOidcTokenVerifier googleOidcTokenVerifier;

    @Override
    @Transactional
    public AccessTokenResponse login(LoginRequest request, HttpServletResponse response) {
        Payload payload = googleOidcTokenVerifier.verify(request.idToken());
        Member member = memberRepository.findByProviderAndEmail(request.provider(), payload.get(CLAIM_EMAIL).toString())
                .orElseGet(() -> signup(request.provider(), payload));
        member.updateInfo(payload);
        return createTokens(member, response);
    }

    @Override
    @Transactional
    public AccessTokenResponse reissueToken(TokenRequest request, HttpServletResponse response, String refreshToken) {
        Authentication authentication = validateTokens(request.accessToken(), refreshToken);
        return createTokens(memberService.findById(Long.parseLong(authentication.getName())), response);
    }

    @Override
    @Transactional
    public void logout(TokenRequest request, String refreshToken) {
        RefreshToken existedRefreshToken = findRefreshToken(refreshToken);
        refreshTokenRedisRepository.delete(existedRefreshToken);
    }

    private Member signup(Provider provider, Payload payload) {
        Member member = memberRepository.save(Member.of(provider, payload));
        directoryService.createDefaultDirectoriesForMember(member);
        return member;
    }

    private AccessTokenResponse createTokens(Member member, HttpServletResponse response) {
        RefreshToken refreshToken = refreshTokenRedisRepository.save(jwtUtil.getRefreshToken(member.getId()));
        response.addCookie(createRefreshTokenCookie(refreshToken.getToken()));
        return AccessTokenResponse.of(BEARER_TYPE, jwtUtil.generateAccessToken(member));
    }

    private Cookie createRefreshTokenCookie(String refreshToken) {
        Cookie cookie = new Cookie(REFRESH_TOKEN, refreshToken);
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        return cookie;
    }

    private Authentication validateTokens(String accessToken, String refreshToken) {
        jwtUtil.validateToken(refreshToken);
        Authentication authentication = jwtUtil.getAuthentication(accessToken);
        RefreshToken existedRefreshToken = findRefreshToken(refreshToken);
        if (!existedRefreshToken.getMemberId().equals(authentication.getName())) {
            throw new BadRequestException(INVALID_REFRESH_TOKEN);
        }
        refreshTokenRedisRepository.delete(existedRefreshToken);
        return authentication;
    }

    private RefreshToken findRefreshToken(String refreshToken) {
        return refreshTokenRedisRepository.findById(refreshToken)
                .orElseThrow(() -> new BadRequestException(REFRESH_TOKEN_NOT_FOUND));
    }
}
