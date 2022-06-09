package br.unicap.bugout.bug;

import br.unicap.bugout.user.UserService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

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