package br.unicap.bugout.track;

import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

@DisplayName("TrackService")
@ExtendWith(MockitoExtension.class)
class TrackServiceTest {

    @Mock
    TrackRepository repository;

    TrackService service;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service = new TrackService(repository);
    }

    @AfterEach
    void tearDown() {
        service = null;
    }


    @Nested
    @DisplayName("Get By ID")
    class GetById {

        @Test
        @DisplayName("Should ... when given ...")
        void shouldWhenGiven() {
            // given


            // when


            // then

        }

    }

    @Nested
    @DisplayName("Get All")
    class GetAll {

    }

}