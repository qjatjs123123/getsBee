package com.ssafy.getsbee.domain.highlight.service;

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
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
        String s3Url = saveMessageToS3(post.getId(), message);

        // Post의 body_url 필드를 업데이트합니다.
        post.changeBodyUrl(s3Url);
        postRepository.save(post);
        
        postElasticService.savePostDocument(highlight);
        return HighlightResponse.of(highlight.getId());
    }

    private String saveMessageToS3(Long id, String message) {
        String fileName = "post-messages/" + postId + ".txt";
        // S3에 파일을 업로드하고 URL을 반환하는 로직을 구현해야 합니다.
        // 예시로 AWS SDK를 사용한 S3 파일 업로드 코드를 작성합니다.

        try {
            // message 내용을 ByteArrayInputStream으로 변환
            byte[] messageBytes = message.getBytes(StandardCharsets.UTF_8);
            InputStream inputStream = new ByteArrayInputStream(messageBytes);

            // S3 객체 메타데이터 설정
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(messageBytes.length);
            metadata.setContentType("text/plain");

            // S3에 파일 업로드
            amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

            // 업로드한 파일의 URL 반환
            return amazonS3Client.getUrl(bucketName, fileName).toString();
        } catch (AmazonServiceException e) {
            // S3 예외 처리 로직 추가
            throw new RuntimeException("Failed to upload file to S3", e);
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
