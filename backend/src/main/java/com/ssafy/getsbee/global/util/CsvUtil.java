package com.ssafy.getsbee.global.util;

import com.ssafy.getsbee.domain.interest.entity.Interest;
import com.ssafy.getsbee.domain.interest.repository.InterestRepository;
import com.ssafy.getsbee.domain.member.dto.request.MemberCsv;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.getsbee.global.consts.StaticConst.*;

@Component
@RequiredArgsConstructor
public class CsvUtil {

    private final MemberRepository memberRepository;
    private final InterestRepository interestRepository;

    public File createMemberCsv() {
        File memberCsv = new File(System.getProperty("user.dir") + "/" + MEMBER_CSV);

        try (FileWriter fileWriter = new FileWriter(memberCsv);
             CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader(USER_ID, AGE, CATEGORY))) {

            List<Member> members = memberRepository.findAll();
            List<MemberCsv> memberCsvs = new ArrayList<>();
            for (Member member : members) {
                List<Interest> interests = interestRepository.findAllByMember(member);
                if (interests.isEmpty()) {
//                    memberCsvs.add(new MemberCsv(member.getId(), member.getBirthYear(), ))
                }
            }


        } catch (IOException e) {

        }
        return null;
    }


    private String nullToString(String value) {
        return value == null ? "" : value;
    }

    private String IntegerToString(Integer value) {
        return value == null ? "" : value.toString();
    }

    private String interestToString(List<Interest> interests) {

        StringBuilder categoryString = new StringBuilder();
        for (Interest interest : interests) {
            categoryString.append(interest.getCategory().getValue()).append("|");
        }
        categoryString.delete(categoryString.length() - 1, categoryString.length());
        return categoryString.toString();
    }
}
