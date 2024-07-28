package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.response.OidcPublicKeysResponse;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class GoogleOauthClient {

    private final WebClient webClient;

    @Cacheable(cacheNames = "GoogleOIDC", cacheManager = "oidcCacheManager")
    public OidcPublicKeysResponse getGoogleOidcPublicKeys() {
        return webClient.mutate()
                .baseUrl("https://www.googleapis.com/oauth2/v3/certs")
                .build()
                .get()
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.just(new BadRequestException(GOOGLE_SERVER_ERROR)))
                .bodyToMono(OidcPublicKeysResponse.class)
                .block();
    }
}
