package com.ssafy.getsbee.domain.post.entity;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.HighlightDocument;
import lombok.*;
import org.hibernate.annotations.Filter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.DateFormat;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import javax.annotation.Nullable;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.data.elasticsearch.annotations.FieldType.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString
@Document(indexName = "post")
public class PostDocument {
    @Id
    @Field(type = Keyword)
    private String postId;

    @Field(type = Long)
    private Long memberId;

    @Field(type = Long)
    private Long directoryId;

    @Field(type = Keyword)
    private String url;


    @Field(type = Text)
    private String title;

    @Field(type = Text)
    private String note;

    @Field(type = Nested)
    private List<HighlightDocument> highlights;

//    @Field(type = Date, format = DateFormat.date)
//    private LocalDateTime date;

    @Field(type= Boolean)
    private Boolean isPublic;

    @Field(type= Boolean)
    private Boolean isDeleted;

    @Builder
    public PostDocument(Post post) {
        this.postId = post.getId().toString();
        this.memberId = post.getMember().getId();
        this.directoryId = post.getDirectory().getId();
        this.url = post.getUrl();
        this.title = post.getTitle();
        this.note = post.getNote();
        this.highlights = new ArrayList<>();
        this.isPublic = post.getIsPublic();
        this.isDeleted = post.getIsDeleted();
//        this.date = post.getCreatedAt();
    }

    public void addHighlight(Highlight highlight) {
        this.highlights.add(HighlightDocument.builder()
                        .id(highlight.getId())
                        .content(highlight.getContent())
                        .isDeleted(false)
                .build());
    }

    public void deleteHighlight(Highlight highlight) {
        this.highlights.stream()
                .filter(highlightDocument -> highlightDocument.getId().equals(highlight.getId()))
                .forEachOrdered(HighlightDocument::removeHighlightDocument);
    }

    public void deletePostDocument() {
        this.isDeleted = true;
    }

    public void deleteAllHighlightDocuments() {
        this.highlights.forEach(HighlightDocument::removeHighlightDocument);
    }
}
