package com.ssafy.getsbee.global.consts;

public class StaticConst {

    /** Auth */
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String AUTHORITIES_KEY = "auth";
    public static final String ANONYMOUS_USER = "anonymousUser";
    public static final String AUTHORITY_DELIMITER = ",";
    public static final String BEARER_TYPE = "Bearer";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String CLAIM_EMAIL = "email";
    public static final String CLAIM_PROFILE = "profile";
    public static final String CLAIM_NAME = "name";

    public static final String[] AUTH_URL = { "/auth/**", };

    public static final int MAX_MEMORY_SIZE = 5 * 1024 * 1024;
    public static final int TEN_SECONDS = 10 * 1000;

    public static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    public static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14;
    public static final long ONE_MINUTE = 60 * 1000L;
    public static final long SEVEN_DAYS = 7L;

    /** Directory */


    /** Post */

}
