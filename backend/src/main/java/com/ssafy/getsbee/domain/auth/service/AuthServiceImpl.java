package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.request.LoginRequest;
import com.ssafy.getsbee.domain.auth.dto.response.AccessTokenResponse;
import com.ssafy.getsbee.domain.auth.dto.response.OidcDecodePayload;
import com.ssafy.getsbee.domain.directory.service.DirectoryService;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final DirectoryService directoryService;
    private final GoogleOauthHelper googleOauthHelper;
    private final MemberRepository memberRepository;

    @Override
    public AccessTokenResponse login(LoginRequest request) {
        OidcDecodePayload payload = googleOauthHelper.getOidcDecodePayload(request.idToken());
        if (memberRepository.existsByProviderAndEmail(request.provider(), payload.email())) {
            return null;
        }

//        directoryService.createDefaultDirectories();
//        Member member =

        return null;
    }
}
