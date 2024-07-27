package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.GetsbeeApplication;
import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.member.entity.Authority;
import com.ssafy.getsbee.domain.member.entity.Member;
import com.ssafy.getsbee.domain.member.entity.Provider;
import com.ssafy.getsbee.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import jakarta.transaction.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = GetsbeeApplication.class)
@ActiveProfiles("local")
class DirectoryServiceImplTest {

    @Autowired
    private DirectoryServiceImpl directoryService;

    @Autowired
    private DirectoryRepository directoryRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Member member;

    @BeforeEach
    @Transactional
    void setUp() {
        member = Member.builder()
                .email("example@example.com")
                .provider(Provider.GOOGLE)
                .authority(Authority.ROLE_USER)
                .birthYear(1990)
                .profile("profile.jpg")
                .name("John Doe")
                .isDeleted(false)
                .build();
        member = memberRepository.save(member);

        directoryService.createDefaultDirectoriesForMember(member);

        Directory rootDirectory = directoryRepository.findRootDirectoryByMember(member);
        Directory bookmarkDirectory = directoryRepository.findBookmarkDirectoryByMember(member);

        Directory secondFolder = Directory.builder()
                .name("Second Folder")
                .depth(1)
                .prevDirectory(bookmarkDirectory)
                .nextDirectory(null)
                .parentDirectory(rootDirectory)
                .member(member)
                .isDeleted(false)
                .build();
        directoryRepository.save(secondFolder);

        bookmarkDirectory.setNextDirectory(secondFolder);
        directoryRepository.save(bookmarkDirectory);

        Directory child1 = Directory.builder()
                .name("Child1")
                .depth(2)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(secondFolder)
                .member(member)
                .isDeleted(false)
                .build();
        directoryRepository.save(child1);

        Directory child2 = Directory.builder()
                .name("Child2")
                .depth(2)
                .prevDirectory(child1)
                .nextDirectory(null)
                .parentDirectory(secondFolder)
                .member(member)
                .isDeleted(false)
                .build();
        directoryRepository.save(child2);

        child1.setNextDirectory(child2);
        directoryRepository.save(child1);

        Directory child3 = Directory.builder()
                .name("Child3")
                .depth(2)
                .prevDirectory(child2)
                .nextDirectory(null)
                .parentDirectory(secondFolder)
                .member(member)
                .isDeleted(false)
                .build();
        directoryRepository.save(child3);

        child2.setNextDirectory(child3);
        directoryRepository.save(child2);
    }

    @Test
    @Transactional
    void findDefaultDirectoryTest(){
        Directory rootDirectory = directoryRepository.findRootDirectoryByMember(member);
        Directory temporaryDirectory = directoryRepository.findTemporaryDirectoryByMember(member);
        Directory bookmarkDirectory = directoryRepository.findBookmarkDirectoryByMember(member);
        assertEquals("Root", rootDirectory.getName());
        assertEquals("Temporary", temporaryDirectory.getName());
        assertEquals("Bookmark", bookmarkDirectory.getName());
    }

    @Test
    @Transactional
    void createDefaultDirectoriesTest() {
        List<DirectoryResponse> directories = directoryService.findAllByMember(member);

        assertNotNull(directories);
        assertEquals(3, directories.size(), "depth1짜리 폴더는 3개");

        DirectoryResponse tempDirectory = directories.stream()
                .filter(dir -> "Temporary".equals(dir.name()))
                .findFirst()
                .orElse(null);

        DirectoryResponse bookmarkDirectory = directories.stream()
                .filter(dir -> "Bookmark".equals(dir.name()))
                .findFirst()
                .orElse(null);

        DirectoryResponse secondFolder = directories.stream()
                .filter(dir -> "Second Folder".equals(dir.name()))
                .findFirst()
                .orElse(null);

        assertNotNull(tempDirectory, "Temporary 폴더는 만들어졌다");
        assertNotNull(bookmarkDirectory, "Bookmark 폴더는 만들어졌다");
        assertNotNull(secondFolder, "Second Folder 폴더는 만들어졌다");

        assertEquals(3, secondFolder.children().size(), "SecondFolder의 child는 3개");
        for(DirectoryResponse d : directories){
            System.out.println(d.toString());
        }
    }

    @Test
    @Transactional
    void findAllByMemberTest() {
        List<DirectoryResponse> directories = directoryService.findAllByMember(member);
        assertEquals(3, directories.size(), "depth 1인 폴더는 3개여야 한다.");
        assertEquals(3, directories.get(2).children().size(), "Second Folder의 children은 3개이다.");
    }
}
