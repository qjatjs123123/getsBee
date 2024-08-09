package com.ssafy.getsbee.infra.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Service {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadFile(File uploadFile, String filePath) {
        String fileName = filePath + "/" + uploadFile.getName();
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeFile(uploadFile);
        return uploadImageUrl;
    }

    public void deleteS3(String filePath) {
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, filePath));
    }

    private String putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private void removeFile(File targetFile) {
        targetFile.delete();
    }
}
