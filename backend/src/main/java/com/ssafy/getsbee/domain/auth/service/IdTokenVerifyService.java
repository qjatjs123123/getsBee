package com.ssafy.getsbee.domain.auth.service;

import static com.google.api.client.json.webtoken.JsonWebToken.*;

public interface IdTokenVerifyService {

    Payload verifyGoogleIdToken(String idToken);
}
