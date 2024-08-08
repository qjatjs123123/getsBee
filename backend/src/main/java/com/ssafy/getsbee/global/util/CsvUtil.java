package com.ssafy.getsbee.global.util;

import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import com.ssafy.getsbee.domain.post.entity.Post;
import com.ssafy.getsbee.domain.post.repository.PostRepository;
import com.ssafy.getsbee.global.error.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.StringJoiner;

import static com.ssafy.getsbee.global.consts.StaticConst.*;
import static com.ssafy.getsbee.global.error.ErrorCode.*;

@Component
@RequiredArgsConstructor
public class CsvUtil {

    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final InterestRepository interestRepository;

    public File createMemberCsv() {
        File memberCsv = new File(System.getProperty("user.dir"), MEMBER_CSV);
        List<Member> members = memberRepository.findAll();

        try (FileWriter fileWriter = new FileWriter(memberCsv);
             CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader(USER_ID, AGE, CATEGORY))) {
            for (Member member : members) {
                csvPrinter.printRecord(member.getId(), transferToAge(member.getBirthYear()), interestToString(interestRepository.findAllByMember(member)));
            }
        } catch (IOException e) {
            throw new BadRequestException(CSV_ERROR);
        }
        return null;
    }

    public File createPostCsv() {
        File postCsv = new File(System.getProperty("user.dir"), POST_CSV);
        List<Post> posts = postRepository.findAll();
        String category = DEFAULT;

        try (FileWriter fileWriter = new FileWriter(postCsv);
             CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader(ITEM_ID, CATEGORY))) {
            for (Post post : posts) {
                Optional<Interest> interest = interestRepository.findByUrl(post.getUrl());
                if (interest.isPresent()) {
                    category = interest.get().getCategory().getValue();
                }
                csvPrinter.printRecord(post.getId(), category);
            }
        } catch (IOException e) {
            throw new BadRequestException(CSV_ERROR);
        }
        return null;
    }

    private String transferToAge(Integer birthYear) {
        return birthYear == null ? "" : Integer.toString(LocalDateTime.now().getYear() / 10 * 10);
    }

    private String interestToString(List<Interest> interests) {
        if (interests.isEmpty()) {
            return DEFAULT;
        }
        StringJoiner category = new StringJoiner("|");
        for (Interest interest : interests) {
            category.add(interest.getCategory().getValue());
        }
        return category.toString();
    }
}
