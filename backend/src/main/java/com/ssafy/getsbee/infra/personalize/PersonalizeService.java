package com.ssafy.getsbee.infra.personalize;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.personalizeruntime.PersonalizeRuntimeClient;
import software.amazon.awssdk.services.personalizeruntime.model.GetRecommendationsRequest;
import software.amazon.awssdk.services.personalizeruntime.model.GetRecommendationsResponse;

import java.util.List;

@Component
public class PersonalizeService {

    private final PersonalizeRuntimeClient personalizeRuntimeClient;

    public PersonalizeService(
            @Value("${cloud.aws.credentials.access-key}") String accessKey,
            @Value("${cloud.aws.credentials.secret-key}") String secretKey,
            @Value("${cloud.aws.region.static}") String region) {

        AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(accessKey, secretKey);
        this.personalizeRuntimeClient = PersonalizeRuntimeClient.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
                .region(Region.of(region))
                .build();
    }

    public List<Long> getRecommendations(String campaignArn, String userId, String itemId, Integer size) {
        GetRecommendationsRequest request = GetRecommendationsRequest.builder()
                .campaignArn(campaignArn)
                .itemId(itemId)
                .userId(userId)
                .numResults(size)
                .build();

        GetRecommendationsResponse response = personalizeRuntimeClient.getRecommendations(request);
        response.itemList().forEach(item ->
                System.out.println("Item ID: " + item.itemId())
        );
        System.out.println(response.itemList().size());
        return response.itemList().stream().map(item -> Long.parseLong(item.itemId())).toList();
    }
}
