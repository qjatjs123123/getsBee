package com.ssafy.getsbee.global.util;

import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.UnauthorizedException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Slf4j
@Component
public class JwtUtil {

    private final SecretKey secretkey;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        this.secretkey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String generateAccessToken(Authentication authentication, Member member) {
        long now = (new Date()).getTime();
        return Jwts.builder()
                .subject(authentication.getName())
                .claim(CLAIM_EMAIL, member.getEmail())
                .claim(CLAIM_NAME, member.getName())
                .claim(CLAIM_PROFILE, member.getProfile())
                .claim(AUTHORITIES_KEY, getAuthorities(authentication))
                .expiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
                .signWith(secretkey, Jwts.SIG.HS512)
                .compact();
    }

    public String generateRefreshToken(Member member) {
        long now = (new Date()).getTime();
        return Jwts.builder()
                .expiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .signWith(secretkey, Jwts.SIG.HS512)
                .compact();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = parseClaims(accessToken);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new UnauthorizedException(INVALID_AUTH_TOKEN);
        }
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        UserDetails principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().verifyWith(secretkey).build().parseSignedClaims(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.error("잘못된 JWT 서명입니다.", e);
        } catch (ExpiredJwtException e) {
            log.error("만료된 JWT 토큰입니다.", e);
            throw new UnauthorizedException(UNAUTHORIZED_ACCESS);
        } catch (UnsupportedJwtException e) {
            log.error("지원되지 않는 JWT 토큰입니다.", e);
        } catch (IllegalArgumentException e) {
            log.error("JWT 토큰이 잘못되었습니다.", e);
        }
        throw new BadRequestException(INVALID_TOKEN);
    }

    private String getAuthorities(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parser().verifyWith(secretkey).build().parseSignedClaims(accessToken).getPayload();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
