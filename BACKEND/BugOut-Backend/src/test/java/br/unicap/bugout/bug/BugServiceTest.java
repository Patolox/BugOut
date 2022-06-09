package br.unicap.bugout.bug;

import br.unicap.bugout.user.UserService;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

@DisplayName("BugService")
@ExtendWith(MockitoExtension.class)
class BugServiceTest {

    @Mock
    BugRepository repository;
    @Mock
    UserService userService;

    BugService service;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service = new BugService(repository, userService);
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

    @Nested
    @DisplayName("Create")
    class Create {

    }

    @Nested
    @DisplayName("Update")
    class Update {

    }

    @Nested
    @DisplayName("Delete By ID")
    class DeleteById {

    }

    @Nested
    @DisplayName("Exists")
    class Exists {

    }

    @Nested
    @DisplayName("Exists Other Than Self")
    class ExistsOtherThanSelf {

    }

}