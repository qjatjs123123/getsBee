package com.ssafy.getsbee.global.consts;

public class StaticConst {

    /** Auth */
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String AUTHORITIES_KEY = "auth";
    public static final String ANONYMOUS_USER = "anonymousUser";
    public static final String AUTHORITY_DELIMITER = ",";
    public static final String TOKEN_SPLIT_DELIMITER = "//.";
    public static final String BEARER_TYPE = "Bearer";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String CLAIM_EMAIL = "email";
    public static final String CLAIM_PICTURE = "picture";
    public static final String CLAIM_NAME = "name";
    public static final String KID = "kid";
    public static final String DASH = "-";
    public static final String DOUBLE_DASH = "--";
    public static final String RSA = "RSA";
    public static final String REFRESH_TOKEN = "refresh_token";
    public static final String AUTH_URL = "/api/v1/auth/**";
    public static final String GOOGLE_PUBLIC_KEY_URL = "https://www.googleapis.com/oauth2/v3/certs";

    public static final int MAX_MEMORY_SIZE = 5 * 1024 * 1024;
    public static final int SIGN_NUM = 1;

    public static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30;
    public static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14;
    public static final long ONE_MINUTE = 60 * 1000L;
    public static final long SEVEN_DAYS = 7L;

    /** Directory */


    /** Post */

}
