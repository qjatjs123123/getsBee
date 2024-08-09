package com.ssafy.getsbee.global.config;

import com.ssafy.getsbee.global.util.CsvUtil;
import com.ssafy.getsbee.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SchedulerConfig {

    private final CsvUtil csvUtil;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.directory.member}")
    private String memberDirectory;

    @Value("${cloud.aws.s3.directory.post}")
    private String postDirectory;

    @Scheduled(fixedRate = 1000 * 60 * 15)
    public void createMemberCsv() {
        s3Service.uploadFile(csvUtil.createMemberCsv(), memberDirectory);
    }

    @Scheduled(fixedRate = 1000 * 60 * 15)
    public void createPostCsv() {
        s3Service.uploadFile(csvUtil.createPostCsv(), postDirectory);
    }
}
