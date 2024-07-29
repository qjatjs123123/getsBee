package com.ssafy.getsbee.domain.auth.service;

import com.ssafy.getsbee.domain.auth.dto.response.OidcDecodePayload;
import com.ssafy.getsbee.global.consts.StaticConst;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.UnauthorizedException;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;

import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
public class JwtOidcProvider {

    public String getKidFromUnsignedTokenHeader(String token, String iss, String aud) {
        return (String) getUnsignedTokenClaims(token, iss, aud).getHeader().get(KID);
    }

    public OidcDecodePayload getOidcTokenBody(String token, String modulus, String exponent) {
        Claims payload = getOidcTokenJws(token, modulus, exponent).getPayload();
        return OidcDecodePayload.of(payload);
    }

    private Jwt<Header, Claims> getUnsignedTokenClaims(String token, String iss, String aud) {
        try {
            return Jwts.parser()
                    .requireAudience(aud)
                    .requireIssuer(iss)
                    .build()
                    .parseClaimsJwt(getUnsignedToken(token));
        } catch (Exception e) {
            throw new UnauthorizedException(INVALID_ID_TOKEN);
        }
    }

    private String getUnsignedToken(String token) {
        String[] splitToken = token.split("\\.");
        if (splitToken.length != 3) throw new BadRequestException(INVALID_ID_TOKEN);
        return splitToken[0] + "." + splitToken[1] + ".";
    }

    private Jws<Claims> getOidcTokenJws(String token, String modulus, String exponent) {
        try {
            token = token.replace("—", "--");
            return Jwts.parser()
                    .setSigningKey(getRSAPublicKey(modulus, exponent))
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            throw new IllegalArgumentException("만료된 Id Token 입니다.");
        } catch (Exception e) {
            throw new IllegalArgumentException("잘못된 Id Token 입니다.");
        }
    }

    private Key getRSAPublicKey(String modulus, String exponent) throws NoSuchAlgorithmException, InvalidKeySpecException {
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");

        byte[] decodeN = Base64.getUrlDecoder().decode(modulus);
        byte[] decodeE = Base64.getUrlDecoder().decode(exponent);
        BigInteger n = new BigInteger(1, decodeN);
        BigInteger e = new BigInteger(1, decodeE);

        RSAPublicKeySpec keySpec = new RSAPublicKeySpec(n, e);
        return keyFactory.generatePublic(keySpec);
    }
}
