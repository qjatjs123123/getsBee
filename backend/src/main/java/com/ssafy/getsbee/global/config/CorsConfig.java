package com.ssafy.getsbee.global.config;

import com.ssafy.getsbee.global.consts.StaticConst;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Collections;

import static com.ssafy.getsbee.global.consts.StaticConst.*;

public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setMaxAge(3600L);
        config.setExposedHeaders(Collections.singletonList(AUTHORIZATION_HEADER));

        configSource.registerCorsConfiguration("/**", config);
        return new CorsFilter(configSource);
    }
}
