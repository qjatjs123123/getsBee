package com.ssafy.getsbee.domain.highlight.service;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.highlight.dto.request.CreateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateHighlightRequest;
import com.ssafy.getsbee.domain.highlight.dto.request.UpdateIndexHighlight;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.domain.post.service.PostElasticService;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.ForbiddenException;
import com.ssafy.getsbee.global.util.LogUtil;
import com.ssafy.getsbee.infra.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.ssafy.getsbee.global.common.model.Interaction.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Service
@RequiredArgsConstructor
public class HighlightServiceImpl implements HighlightService {

    private final HighlightRepository highlightRepository;
    private final MemberService memberService;
    private final PostRepository postRepository;
    private final DirectoryRepository directoryRepository;
    private final PostElasticService postElasticService;
    private final ExtractCategoryService extractCategoryService;
    private final InterestRepository interestRepository;
    private final S3Service s3Service;

    @Value("${cloud.aws.s3.directory.body}")
    private String directoryBodyPath;

    @Override
    @Transactional
    public HighlightResponse addHighlight(CreateHighlightRequest request, Long memberId) {
        Member member = memberService.findById(memberId);

        Post post = postRepository.findByMemberAndUrl(member, request.url())
                        .orElseGet(()->{
                            Directory directory = directoryRepository.findTemporaryDirectoryByMember(member);
                            Post newPost = postRepository.save(request.toPostEntity(member, directory));
                            LogUtil.loggingInteraction(CREATE, newPost.getId());
                            return newPost;
                        });

        if (!interestRepository.existsByUrl(post.getUrl())) {
            extractCategoryService.extractCategoryFromPost(post)
                    .ifPresent(category ->
                            interestRepository.save(Interest.of(post.getUrl(), category)));
        }

        Highlight highlight = request.toHighlightEntity(post);
        highlightRepository.save(highlight);

        String message = request.message();
        String s3Url = saveMessageToS3(message);

        post.changeBodyUrl(s3Url);
        postRepository.save(post);
        
        postElasticService.savePostDocument(highlight);
        return HighlightResponse.of(highlight.getId());
    }

    private String saveMessageToS3(String message) {
        String directoryPath = directoryBodyPath;

        String fileName = UUID.randomUUID() + ".txt";
        File tempFile = null;

        try {
            tempFile = new File(System.getProperty("java.io.tmpdir"), fileName);
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(message.getBytes(StandardCharsets.UTF_8));
            }
            return s3Service.uploadFile(tempFile, directoryPath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert message to file", e);
        } finally {
            if (tempFile != null && tempFile.exists()) {
                tempFile.delete();
            }
        }
    }



    @Override
    @Transactional
    public void deleteHighlight(Long highlightId, Long memberId) {
        Member member = memberService.findById(memberId);
        Highlight highlight = highlightRepository.findById(highlightId)
                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));

        if (highlight.getPost().getMember() != member) {
            throw new ForbiddenException(_FORBIDDEN);
        }

        Post post = highlight.getPost();
        postElasticService.deleteHighlightDocument(highlight);
        highlightRepository.delete(highlight);

        if(post.getHighlights() == null && post.getNote()== null){
            postRepository.delete(post);
        }
    }

    @Override
    @Transactional
    public void updateHighlight(Long highlightId, UpdateHighlightRequest request, Long memberId) {
        Member member = memberService.findById(memberId);
        Highlight highlight = highlightRepository.findById(highlightId)
                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));

        if(highlight.getPost().getMember() != member) {
            throw new ForbiddenException(_FORBIDDEN);
        }
        highlight.changeColor(request.color());
        highlightRepository.save(highlight);
    }

    @Override
    @Transactional
    public List<HighlightResponse> getHighlights(String url, Long memberId) {
        Member member = memberService.findById(memberId);
        return postRepository.findAllByMemberAndUrl(member, url)
                .map(highlightRepository::findAllByPost)
                .map(highlights -> {
                    List<HighlightResponse> hr = new ArrayList<>();
                    for (Highlight highlight : highlights) {
                        hr.add(HighlightResponse.of(highlight));
                    }
                    return hr;
                })
                .orElseGet(ArrayList::new);
    }

    @Override
    @Transactional
    public void updateHighlightsIndex(List<UpdateIndexHighlight> requests, Long memberId) {
        Member member = memberService.findById(memberId);

        List<Highlight> highlights = new ArrayList<>();
        requests.forEach(updateIndexHighlight -> {
            Highlight highlight = highlightRepository.findById(updateIndexHighlight.highlightId())
                    .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));
            if (highlight.getPost().getMember() != member) {
                throw new BadRequestException(_FORBIDDEN);
            }
            highlight.changeIndexs(updateIndexHighlight.startIndex(), updateIndexHighlight.startOffset()
                    , updateIndexHighlight.lastIndex(), updateIndexHighlight.lastOffset());
            highlights.add(highlight);
        });
    }
}
