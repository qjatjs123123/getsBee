package com.ssafy.getsbee.domain.highlight.service;

import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.highlight.dto.request.*;
import com.ssafy.getsbee.domain.highlight.dto.response.HighlightResponse;
import com.ssafy.getsbee.domain.highlight.dto.response.S3UrlResponse;
import com.ssafy.getsbee.domain.highlight.entity.Highlight;
import com.ssafy.getsbee.domain.highlight.entity.HighlightLog;
import com.ssafy.getsbee.domain.highlight.repository.HighlightLogRepository;
import com.ssafy.getsbee.domain.highlight.repository.HighlightRepository;
import com.ssafy.getsbee.domain.highlight.repository.HighlightLogRepository;
import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.service.MemberService;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.entity.PostDocument;
import com.ssafy.getsbee.domain.post.repository.PostElasticRepository;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.domain.post.service.PostElasticService;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import com.ssafy.getsbee.global.error.exception.ForbiddenException;
import com.ssafy.getsbee.global.util.LogUtil;
import com.ssafy.getsbee.global.util.SecurityUtil;
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
    private final PostElasticRepository postElasticRepository;

    private final HighlightLogRepository highlightLogRepository;

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

        Highlight highlight = request.toHighlightEntity(post);
        highlightRepository.save(highlight);

//        HighlightLog highlightLog = new HighlightLog(highlight, false, post);
//        highlightLogRepository.save(highlightLog);

        postElasticService.savePostDocument(highlight);
        return HighlightResponse.of(highlight.getId());
    }

    @Override
    @Transactional
    public void deleteHighlight(Long highlightId, DeleteHighlightRequest request, Long memberId) {
        Member member = memberService.findById(memberId);
        Highlight highlight = highlightRepository.findById(highlightId)
                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));

        if (highlight.getPost().getMember() != member) {
            throw new ForbiddenException(_FORBIDDEN);
        }

        Post post = highlight.getPost();
        saveMessageToS3(request.message(), post);

        postElasticService.deleteHighlightDocument(highlight);
        highlightRepository.delete(highlight);

//        HighlightLog highlightLog = new HighlightLog(highlight, true, post);
//        highlightLogRepository.save(highlightLog);

        if(post.getHighlights().isEmpty() && post.getNote()== null){
            PostDocument postDocument = postElasticRepository.findByPostId(post.getId()).orElseThrow(
                    () -> new BadRequestException(POSTDOCUMENT_NOT_FOUND)
            );
            postElasticRepository.delete(postDocument);
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

//        HighlightLog highlightLog = highlightLogRepository.findByHighlightId(highlightId)
//                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));
//        if(highlightLog.getPost().getMember() != member) {
//            throw new ForbiddenException(_FORBIDDEN);
//        }
//        highlightLog.changeColor(request.color());
//        highlightLogRepository.save(highlightLog);
    }

//    @Override
//    public List<HighlightResponse> getHighlights(String url, Long memberId) {
//        Member member = memberService.findById(memberId);
//        return postRepository.findAllByMemberAndUrl(member, url)
//                .map(highlightLogRepository::findAllByPost)
//                .map(highlights -> {
//                    List<HighlightResponse> hr = new ArrayList<>();
//                    for (HighlightLog highlight : highlights) {
//                        hr.add(HighlightResponse.of(highlight));
//                    }
//                    return hr;
//                })
//                .orElseGet(ArrayList::new);
//    }


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

    @Override
    @Transactional
    public S3UrlResponse showBodyFromUrlAndMemberId(HighlightsRequest highlightsRequest) {
        Member member = memberService.findById(SecurityUtil.getCurrentMemberId());
        return postRepository.findByMemberAndUrl(member, highlightsRequest.url())
                .filter(post -> !post.getIsDeleted())
                .map(post -> S3UrlResponse.from(post.getBodyUrl()))
                .orElse(null);
    }

    @Override
    @Transactional
    public S3UrlResponse modifyHighlightBody(modifyHighlightBodyResponse modifyHighlightBodyResponse) {
        Highlight highlight = highlightRepository.findById(modifyHighlightBodyResponse.highlightId())
                .orElseThrow(() -> new BadRequestException(HIGHLIGHT_NOT_FOUND));
        Post post = highlight.getPost();
        saveMessageToS3(modifyHighlightBodyResponse.message(), post);
        return S3UrlResponse.from(post.getBodyUrl());
    }

    private void saveMessageToS3(String message, Post post) {
        String directoryPath = directoryBodyPath;
        String fileName = UUID.randomUUID() + ".txt";

        File tempFile = new File(System.getProperty("java.io.tmpdir"), fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(message.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e){
            throw new BadRequestException(TXT_ERROR);
        }
        String s3Url = s3Service.uploadFile(tempFile, directoryPath);
        post.changeBodyUrl(s3Url);
        postRepository.save(post);
    }
}
