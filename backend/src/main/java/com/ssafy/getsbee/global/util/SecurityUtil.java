package com.ssafy.getsbee.global.util;

import com.ssafy.getsbee.global.error.exception.UnauthorizedException;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@NoArgsConstructor
public class SecurityUtil {

    public static Long getCurrentMemberId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new UnauthorizedException(INVALID_AUTH_TOKEN);
        }
        return Long.parseLong(authentication.getName());
    }

    public static Boolean hasAuthentication() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new UnauthorizedException(INVALID_AUTH_TOKEN);
        }
        if (authentication.getName().equals(ANONYMOUS_USER)) {
            return false;
        }
        return true;
    }
}

