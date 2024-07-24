package com.ssafy.getsbee.global.consts;

public class StaticConst {

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String AUTHORITIES_KEY = "auth";
    public static final String CLAIM_EMAIL = "email";
    public static final String BEARER_TYPE = "Bearer";
    public static final String ANONYMOUS_USER = "anonymousUser";

    public static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;            // 30 min
    public static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14;  // 14 day
}
