package com.ssafy.getsbee.domain.auth.dto.response;

public record PublicKeyResponse(
        String kid,
        String alg,
        String use,
        String n,
        String e,
        String kty
) {
}
