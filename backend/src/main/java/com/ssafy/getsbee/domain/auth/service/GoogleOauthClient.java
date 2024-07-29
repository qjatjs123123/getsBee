package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.response.OidcPublicKeysResponse;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
@RequiredArgsConstructor
public class GoogleOauthClient {

    private final WebClient webClient;

    @Value("${oauth2.provider.google.public-key-url")
    private String googlePublicKeyUrl;

    @Cacheable(cacheNames = "GoogleOIDC", cacheManager = "oidcCacheManager")
    public OidcPublicKeysResponse getGoogleOidcPublicKeys() {
        return webClient.mutate()
                .baseUrl(googlePublicKeyUrl)
                .build()
                .get()
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.just(new BadRequestException(GOOGLE_SERVER_ERROR)))
                .bodyToMono(OidcPublicKeysResponse.class)
                .block();
    }
}
