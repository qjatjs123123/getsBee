package com.ssafy.getsbee.domain.highlight.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class HighlightDocument {

    @Field(type = FieldType.Long)
    private Long id;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Boolean)
    private boolean isDeleted;

    public void removeHighlightDocument() {
        this.isDeleted = true;
    }
}
