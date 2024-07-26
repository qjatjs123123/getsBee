package com.ssafy.getsbee.domain.directory.service;

import com.ssafy.getsbee.domain.directory.dto.response.DirectoryResponse;
import com.ssafy.getsbee.domain.directory.entity.Directory;
import com.ssafy.getsbee.domain.directory.repository.DirectoryRepository;
import com.ssafy.getsbee.domain.member.entity.Member;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

@SpringBootTest
class DirectoryServiceImplTest {

    @Mock
    private DirectoryRepository directoryRepository;

    @InjectMocks
    private DirectoryServiceImpl directoryService;

    private Member member;
    private List<Directory> directories;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        member = new Member();
        member.setId(1L);

        directories = new ArrayList<>();
        Directory rootDirectory = Directory.builder()
                .name("Root Directory")
                .depth(0)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(null)
                .member(member)
                .isDeleted(false)
                .build();

        Directory tempDirectory = Directory.builder()
                .name("Temporary Directory")
                .depth(1)
                .prevDirectory(null)
                .nextDirectory(null)
                .parentDirectory(rootDirectory)
                .member(member)
                .isDeleted(false)
                .build();

        Directory bookmarkDirectory = Directory.builder()
                .name("Bookmark Directory")
                .depth(1)
                .prevDirectory(tempDirectory)
                .nextDirectory(null)
                .parentDirectory(rootDirectory)
                .member(member)
                .isDeleted(false)
                .build();

        tempDirectory.setNextDirectory(bookmarkDirectory);

        directories.add(rootDirectory);
        directories.add(tempDirectory);
        directories.add(bookmarkDirectory);
    }

    @Test
    void testFindAllByMember() {
        when(directoryRepository.findAllByMember(member)).thenReturn(directories);

        List<DirectoryResponse> result = directoryService.findAllByMember(member);

        assertNotNull(result);
        // Assuming the assembleDirectories method returns 2 elements
        assertEquals(2, result.size());
        assertEquals("Temporary Directory", result.get(0).getName());
        assertEquals("Bookmark Directory", result.get(1).getName());
    }
}
