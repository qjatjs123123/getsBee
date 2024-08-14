package com.ssafy.getsbee.global.util;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class StringUtil {

    public static String extractEmailPrefix(String email) {
        return email.substring(0, email.indexOf("@"));
    }
}
