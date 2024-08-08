package com.ssafy.getsbee.domain.member.service;

import com.ssafy.getsbee.global.consts.StaticConst;
import lombok.RequiredArgsConstructor;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.checkerframework.checker.units.qual.C;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import static com.ssafy.getsbee.global.consts.StaticConst.*;

@Component
@RequiredArgsConstructor
public class CreateMemberCsvServiceImpl implements CreateMemberCsvService {


    @Override
    public File createMemberCsv() {
        File memberCsv = new File(System.getProperty("user.dir") + "/" + MEMBER_CSV);

        try (FileWriter fileWriter = new FileWriter(memberCsv);
             CSVPrinter csvPrinter = new CSVPrinter(fileWriter, CSVFormat.DEFAULT.withHeader(USER_ID, AGE, CATEGORY))) {


        } catch (IOException e) {

        }
        return null;
    }
}
