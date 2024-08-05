package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.GetsbeeApplication;
import com.ssafy.getsbee.domain.directory.dto.request.DirectoryRequest;
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

import java.util.ArrayList;
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
    private Directory rootDirectory;
    private Directory temporaryDirectory;
    private Directory bookmarkDirectory;
    private Directory child1;
    private Directory child2;
    private Directory child3;

    @BeforeEach
    @Transactional
    void setUp() {
        member = Member.builder()
                .email("example@example.com")
                .provider(Provider.GOOGLE)
                .authority(Authority.ROLE_USER)
                .birthYear(1990)
                .picture("profile.jpg")
                .name("John Doe")
                .isDeleted(false)
                .build();
        member = memberRepository.save(member);

        directoryService.createDefaultDirectoriesForMember(member);

        rootDirectory = directoryRepository.findRootDirectoryByMember(member);
        bookmarkDirectory = directoryRepository.findBookmarkDirectoryByMember(member);
        temporaryDirectory = directoryRepository.findTemporaryDirectoryByMember(member);

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

        child1 = Directory.builder()
                .name("Child1")
                .depth(2)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(secondFolder)
                .member(member)
                .isDeleted(false)
                .build();
        directoryRepository.save(child1);

        child2 = Directory.builder()
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

        child3 = Directory.builder()
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
    void findDefaultDirectoryTest(){
        rootDirectory = directoryRepository.findRootDirectoryByMember(member);
        temporaryDirectory = directoryRepository.findTemporaryDirectoryByMember(member);
        bookmarkDirectory = directoryRepository.findBookmarkDirectoryByMember(member);
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

    @Test
    @Transactional
    void modifyDirectoriesTest() {
        System.out.println("Start of modifyDirectoriesTest()");
        // 새로운 디렉토리 구조 생성
        List<DirectoryRequest> directoryRequests = new ArrayList<>();
        directoryRequests.add(new DirectoryRequest(temporaryDirectory.getId().toString(), "Temporary", 1, null, bookmarkDirectory.getId().toString(), rootDirectory.getId().toString(), member.getId())); // Bookmark
        directoryRequests.add(new DirectoryRequest(bookmarkDirectory.getId().toString(), "Bookmark", 1, temporaryDirectory.getId().toString(), "T1", rootDirectory.getId().toString(), member.getId())); // Bookmark
        directoryRequests.add(new DirectoryRequest("T1", "Third Folder", 1, bookmarkDirectory.getId().toString(), null, rootDirectory.getId().toString(), member.getId())); // Third Folder

        // Third Folder의 children 설정
        directoryRequests.add(new DirectoryRequest(child2.getId().toString(), "Child2 modified name", 2, null, child3.getId().toString(), "T1", member.getId())); // Child2
        directoryRequests.add(new DirectoryRequest(child3.getId().toString(), "Child3", 2, child1.getId().toString(), "T2", "T1", member.getId())); // Child3
        directoryRequests.add(new DirectoryRequest("T2", "Child4", 2, child3.getId().toString(), null, "T1", member.getId())); // Child4

        List<DirectoryResponse> modifiedDirectories = directoryService.modifyDirectories(directoryRequests);

        assertNotNull(modifiedDirectories);
        assertEquals(3, modifiedDirectories.size(), "depth1짜리 폴더는 3개");

        DirectoryResponse thirdFolder = modifiedDirectories.stream()
                .filter(dir -> "Third Folder".equals(dir.name()))
                .findFirst()
                .orElse(null);

        assertNotNull(thirdFolder, "Third Folder 폴더는 만들어졌다");
        assertEquals("Third Folder", thirdFolder.name(), "Third Folder 폴더의 이름이 맞다");

        assertEquals(3, thirdFolder.children().size(), "Third Folder의 child는 3개");
        assertEquals("Third Folder / Child2 modified name", thirdFolder.children().get(0).name(), "첫번째 child의 이름은 Third Folder / Child2 modified name");
        assertEquals("Third Folder / Child3", thirdFolder.children().get(1).name(), "두번째 child의 이름은 Third Folder /  Child3");
        assertEquals("Third Folder / Child4", thirdFolder.children().get(2).name(), "세번째 child의 이름은 Third Folder /  Child4");
    }

}
