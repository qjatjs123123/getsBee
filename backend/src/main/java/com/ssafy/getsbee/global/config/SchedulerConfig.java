package com.ssafy.getsbee.global.config;

import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.ErrorCode;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.util.CsvUtil;
import com.ssafy.getsbee.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
@RequiredArgsConstructor
public class SchedulerConfig {

    private final PostRepository postRepository;
    private final InterestRepository interestRepository;
    private final CsvUtil csvUtil;
    private final S3Service s3Service;
    private final WebClient webClient;

    @Value("${cloud.aws.s3.directory.member}")
    private String memberDirectory;

    @Value("${cloud.aws.s3.directory.post}")
    private String postDirectory;

    @Value("${cloud.aws.lambda.url}")
    private String lambdaUrl;

    @Scheduled(fixedRate = 1000 * 60 * 15)
    public void createMemberCsv() {
        s3Service.uploadFile(csvUtil.createMemberCsv(), memberDirectory);
    }

    @Scheduled(fixedRate = 1000 * 60 * 15)
    public void createPostCsv() {
        s3Service.uploadFile(csvUtil.createPostCsv(), postDirectory);
    }

    @Scheduled(fixedRate = 1000 * 60 * 15)
    public void extractLog() {
        webClient.mutate()
                .baseUrl(lambdaUrl)
                .build()
                .get()
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.just(new BadRequestException(AWS_SERVER_ERROR)))
                .bodyToMono(String.class)
                .block();
    }

    @Scheduled(fixedRate = 1000 * 60 * 7)
    public void extractCategory() {

    }
}
