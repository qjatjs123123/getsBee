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
    public static final String CLAIM_PICTURE = "picture";
    public static final String CLAIM_NAME = "name";
    public static final String REFRESH_TOKEN = "refresh_token";
    public static final String AUTH_URL = "/api/v1/auth/**";

    public static final int MAX_MEMORY_SIZE = 5 * 1024 * 1024;

    public static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24;
    public static final long REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 14;
    public static final long ONE_MINUTE = 60 * 1000L;
    public static final long SEVEN_DAYS = 7L;

    /** Directory */

    /** Post */
    public static final String EXTRACT_CATEGORY_PROMPT = "\nHere are the links and the Titles for the links. " +
            "Just answer which category this link belongs to below" +
            "\n[POLITICS, SOCIAL, CULTURE, ECONOMY, IT, WORLD, SPORTS, ENTERTAIN, HEALTH, TRAVEL, EDUCATION, LIVING, BEAUTY, FASHION, SCIENCE]";
    public static final String COMMA = ", ";
    public static final Integer HOT_POST_WEEK_OFFSET = 1;
    public static final Integer HOT_POST_LIMIT = 30;

    /** CSV */
    public static final String MEMBER_CSV = "member.csv";
    public static final String POST_CSV = "post.csv";
    public static final String INTERACTION_CSV = "interaction.csv";
    public static final String USER_ID = "USER_ID";
    public static final String AGE = "AGE";
    public static final String CATEGORY = "CATEGORY";
    public static final String ITEM_ID = "ITEM_ID";
    public static final String CREATION_TIMESTAMP = "CREATION_TIMESTAMP";
    public static final String EVENT_TYPE = "EVENT_TYPE";
    public static final String TIMESTAMP = "TIMESTAMP";
    public static final String DEFAULT = "";

    /** Interaction */
    public static final String VIEW = "VIEW";
    public static final String LIKE = "LIKE";
    public static final String BOOKMARK = "BOOKMARK";
    public static final String CREATE = "CREATE";
}