package com.ssafy.getsbee.domain.post.entity;

import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.HighlightDocument;
import jakarta.persistence.GeneratedValue;
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
    @Id @GeneratedValue
    @Field(type = Keyword)
    private String id;

    @Field(type = Long)
    private Long postId;

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

    @Field(type = Text)
    private String allContent;

    @Field(type= Boolean)
    private Boolean isPublic;


    @Builder
    public PostDocument(Post post) {
        this.postId = post.getId();
        this.memberId = post.getMember().getId();
        this.directoryId = post.getDirectory().getId();
        this.url = post.getUrl();
        this.title = post.getTitle();
        this.note = post.getNote();
        this.isPublic = post.getIsPublic();
    }

    public void assembleText(Post post) {
        StringBuilder str = new StringBuilder();

        for (Highlight highlight : post.getHighlights()) {
            if (!highlight.getIsDeleted()) str.append(highlight.getContent());
        }

        String note = post.getNote() != null ? post.getNote() : "";
        this.allContent = note + " " + post.getTitle() + " " + str.toString();
    }


    public void updatePostDocument(Post post){
        if(post.getNote() != null) this.note = post.getNote();
        this.isPublic = post.getIsPublic();
        this.directoryId = post.getDirectory().getId();
        assembleText(post);
    }

}
