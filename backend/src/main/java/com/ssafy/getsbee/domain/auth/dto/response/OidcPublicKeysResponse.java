package com.ssafy.getsbee.domain.auth.dto.response;

import java.util.List;

public record OidcPublicKeysResponse(
        List<PublicKeyResponse> keys
) {
}
