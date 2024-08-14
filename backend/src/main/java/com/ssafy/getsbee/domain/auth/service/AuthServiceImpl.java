package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.request.TokenRequest;
import com.ssafy.getsbee.domain.auth.dto.response.LoginResponse;
import com.ssafy.getsbee.domain.auth.dto.response.TokenResponse;
import com.ssafy.getsbee.domain.auth.entity.RefreshToken;
import com.ssafy.getsbee.domain.auth.repository.RefreshTokenRedisRepository;
import com.ssafy.getsbee.domain.block.service.BlockService;
import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.member.dto.request.SearchMemberCondition;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.util.JwtUtil;
import com.ssafy.getsbee.global.util.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.google.api.client.json.webtoken.JsonWebToken.*;
import static com.ssafy.getsbee.domain.member.entity.Provider.*;
import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final DirectoryService directoryService;
    private final MemberService memberService;
    private final BlockService blockService;
    private final IdTokenVerifyService idTokenVerifyService;
    private final MemberRepository memberRepository;
    private final RefreshTokenRedisRepository refreshTokenRedisRepository;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest request) {
        Payload payload = validateIdToken(request);
        Member member = memberRepository.findByProviderAndEmail(request.provider(), payload.get(CLAIM_EMAIL).toString())
                .orElseGet(() -> signup(request.provider(), payload));
        member.updateInfo(payload);
        return LoginResponse.of(createTokens(member), blockService.showBlockList(member.getId()));
    }

    @Override
    @Transactional
    public TokenResponse reissueToken(TokenRequest request) {
        Authentication authentication = validateTokens(request.accessToken(), request.refreshToken());
        return createTokens(memberService.findById(Long.parseLong(authentication.getName())));
    }

    @Override
    @Transactional
    public void logout(TokenRequest request) {
        refreshTokenRedisRepository.findById(request.refreshToken())
                .ifPresent(refreshTokenRedisRepository::delete);
    }

    private Payload validateIdToken(LoginRequest request) {
        if (request.provider() == GOOGLE) {
            return idTokenVerifyService.verifyGoogleIdToken(request.idToken());
        }
        throw new BadRequestException(INVALID_INPUT_VALUE);
    }

    private Member signup(Provider provider, Payload payload) {
        if (!memberRepository.search(
                SearchMemberCondition.of(StringUtil.extractEmailPrefix(payload.get(CLAIM_EMAIL).toString()))).isEmpty()) {
            throw  new BadRequestException(DUPLICATE_MEMBER);
        }
        Member member = memberRepository.save(Member.of(provider, payload));
        directoryService.createDefaultDirectoriesForMember(member);
        return member;
    }

    private TokenResponse createTokens(Member member) {
        RefreshToken refreshToken = refreshTokenRedisRepository.save(jwtUtil.getRefreshToken(member.getId()));
        return TokenResponse.of(BEARER_TYPE, jwtUtil.generateAccessToken(member), refreshToken.getToken());
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
