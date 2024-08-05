package com.ssafy.getsbee.domain.directory.entity;

import jakarta.persistence.GeneratedValue;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;

import static org.springframework.data.elasticsearch.annotations.FieldType.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@Document(indexName = "directory")
public class DirectoryDocument {
    @Id
    @GeneratedValue
    @Field(type = Keyword)
    private String id;

    @Field(type = Long)
    private Long directoryId;

    @Field(type = Long)
    private Long memberId;

    @Field(type = Text)
    private String directoryName;

    @Builder
    public DirectoryDocument(Long directoryId, Long memberId, String directoryName) {
        this.directoryId = directoryId;
        this.memberId = memberId;
        this.directoryName = directoryName;
    }

    public void changeDirectoryName(String name) {
        this.directoryName = name;
    }
}
