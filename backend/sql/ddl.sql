-- member Table Create SQL
CREATE TABLE member
(
    `member_id`   BIGINT           NOT NULL    AUTO_INCREMENT,
    `email`       VARCHAR(320)     NOT NULL,
    `provider`    VARCHAR(10)      NOT NULL,
    `authority`   VARCHAR(10)      NOT NULL    DEFAULT 'ROLE_USER',
    `birth_year`  INT              NULL,
    `job`         VARCHAR(30)      NULL,
    `picture`     VARCHAR(2083)    NULL,
    `name`        VARCHAR(73)      NULL,
    `is_deleted`  TINYINT(1)       NOT NULL    DEFAULT 0,
    `created_at`  TIMESTAMP        NOT NULL,
    `updated_at`  TIMESTAMP        NOT NULL,
    PRIMARY KEY (member_id)
);

-- directory Table Create SQL
CREATE TABLE directory
(
    `directory_id`         BIGINT         NOT NULL    AUTO_INCREMENT,
    `name`                 VARCHAR(20)    NOT NULL,
    `depth`                INT            NOT NULL,
    `prev_directory_id`    BIGINT         NULL,
    `next_directory_id`    BIGINT         NULL,
    `parent_directory_id`  BIGINT         NULL,
    `is_deleted`           TINYINT(1)     NOT NULL    DEFAULT 0,
    `member_id`            BIGINT         NOT NULL,
    `created_at`  TIMESTAMP        NOT NULL,
    `updated_at`  TIMESTAMP        NOT NULL,
    PRIMARY KEY (directory_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- post Table Create SQL
CREATE TABLE post
(
    `post_id`         BIGINT           NOT NULL    AUTO_INCREMENT,
    `title`           VARCHAR(50)      NOT NULL,
    `url`             VARCHAR(2083)    NOT NULL,
    `note`            LONGTEXT         NULL,
    `thumbnail_url`   VARCHAR(2083)    NULL,
    `is_public`       TINYINT(1)       NOT NULL    DEFAULT 1,
    `view_count`      BIGINT           NOT NULL    DEFAULT 0,
    `like_count`      BIGINT           NOT NULL    DEFAULT 0,
    `bookmark_count`  BIGINT           NOT NULL    DEFAULT 0,
    `is_deleted`      TINYINT(1)       NOT NULL    DEFAULT 0,
    `member_id`       BIGINT           NOT NULL,
    `directory_id`    BIGINT           NULL,
    `created_at`  TIMESTAMP        NOT NULL,
    `updated_at`  TIMESTAMP        NOT NULL,
    PRIMARY KEY (post_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (directory_id) REFERENCES directory(directory_id)
);

-- likes Table Create SQL
CREATE TABLE likes
(
    `like_id`     BIGINT        NOT NULL    AUTO_INCREMENT,
    `is_deleted`  TINYINT(1)    NOT NULL    DEFAULT 0,
    `member_id`   BIGINT        NOT NULL,
    `post_id`     BIGINT        NOT NULL,
    `created_at`  TIMESTAMP        NOT NULL,
    `updated_at`  TIMESTAMP        NOT NULL,
    PRIMARY KEY (like_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- bookmark Table Create SQL
CREATE TABLE bookmark
(
    `bookmark_id`   BIGINT        NOT NULL    AUTO_INCREMENT,
    `is_deleted`    TINYINT(1)    NOT NULL    DEFAULT 0,
    `member_id`     BIGINT        NOT NULL,
    `post_id`       BIGINT        NOT NULL,
    `directory_id`  BIGINT        NOT NULL,
    `created_at`    TIMESTAMP     NOT NULL,
    `updated_at`    TIMESTAMP     NOT NULL,
    PRIMARY KEY (bookmark_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id),
    FOREIGN KEY (directory_id) REFERENCES directory(directory_id)
);

-- highlight Table Create SQL
CREATE TABLE highlight
(
    `highlight_id`  BIGINT        NOT NULL    AUTO_INCREMENT,
    `content`       LONGTEXT      NOT NULL,
    `color`         VARCHAR(6)    NOT NULL,
    `start_index`   INT           NULL,
    `last_index`    INT           NULL,
    `start_offset`  INT           NULL,
    `last_offset`   INT           NULL,
    `type`          VARCHAR(5)    NOT NULL,
    `is_deleted`    TINYINT(1)    NOT NULL    DEFAULT 0,
    `post_id`       BIGINT        NULL,
    `created_at`    TIMESTAMP     NOT NULL,
    `updated_at`    TIMESTAMP     NOT NULL,
    PRIMARY KEY (highlight_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- comment Table Create SQL
CREATE TABLE comments
(
    `comment_id`  BIGINT          NOT NULL    AUTO_INCREMENT,
    `content`     VARCHAR(300)    NOT NULL,
    `is_deleted`  TINYINT(1)      NOT NULL    DEFAULT 0,
    `member_id`   BIGINT          NOT NULL,
    `post_id`     BIGINT          NOT NULL,
    `created_at`  TIMESTAMP       NOT NULL,
    `updated_at`  TIMESTAMP       NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (post_id) REFERENCES post(post_id)
);

-- follow Table Create SQL
CREATE TABLE follow
(
    `follow_id`              BIGINT        NOT NULL    AUTO_INCREMENT,
    `following_member_id`    BIGINT        NOT NULL,
    `followed_member_id`     BIGINT        NOT NULL,
    `is_deleted`             TINYINT(1)    NOT NULL    DEFAULT 0,
    `followed_directory_id`  BIGINT        NOT NULL,
    `created_at`             TIMESTAMP     NOT NULL,
    `updated_at`             TIMESTAMP     NOT NULL,
    PRIMARY KEY (follow_id),
    FOREIGN KEY (following_member_id) REFERENCES member(member_id),
    FOREIGN KEY (followed_member_id) REFERENCES member(member_id),
    FOREIGN KEY (followed_directory_id) REFERENCES directory(directory_id)
);

-- interest Table Create SQL
CREATE TABLE interest
(
    `interest_id`  BIGINT       NOT NULL    AUTO_INCREMENT,
    `member_id`    BIGINT       NULL,
    `url`          VARCHAR(13)  NULL,
    `created_at`   TIMESTAMP    NOT NULL,
    `updated_at`   TIMESTAMP    NOT NULL,
    PRIMARY KEY (interest_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

-- block Table Create SQL
CREATE TABLE block
(
    `block_id`    BIGINT           NOT NULL    AUTO_INCREMENT,
    `domain`      VARCHAR(2083)    NOT NULL,
    `is_deleted`  TINYINT(1)       NOT NULL,
    `member_id`   BIGINT           NOT NULL,
    `created_at`  TIMESTAMP        NOT NULL,
    `updated_at`  TIMESTAMP        NOT NULL,
    PRIMARY KEY (block_id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);
