package com.ssafy.getsbee.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchedulerConfig {

    @Scheduled(fixedRate = 1000 * 60 * 60)
    public void createMemberCsv() {

    }

    @Scheduled(fixedRate = 1000 * 60 * 60)
    public void createPostCsv() {

    }
}
