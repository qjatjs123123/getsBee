package com.ssafy.getsbee.domain.auth.dto.response;

public record OidcPublicKey(
        String kid,
        String alg,
        String use,
        String n,
        String e,
        String kty
) {
}
