package br.unicap.bugout.user;

import br.unicap.bugout.user.exceptions.UserNotFoundException;
import br.unicap.bugout.user.model.User;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository repository;

    UserService service;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service = new UserService(repository);
    }

    @AfterEach
    void tearDown() {
        service = null;
    }


    @Nested
    @DisplayName("Get By ID")
    class GetById {

        @Test
        @DisplayName("Given existing id, when getting user, then should return user")
        void Given_ExistingId_When_GettingUser_Then_ShouldReturnUser() {
            // given
            final Long userId = 2L;
            final var user = User.builder().id(userId).build();

            when(repository.findById(userId)).thenReturn(Optional.ofNullable(user));

            // when
            User answer = service.getById(userId);

            // then
            assertNotNull(answer);
            assertEquals(userId, answer.getId());
        }

        @Test
        @DisplayName("Given non-existing id, when getting user, then should should throw exception")
        void Given_NonExisting_When_GettingUser_Then_ShouldThrowException() {
            // given
            final Long userId = 0L;
            Class<UserNotFoundException> exception = UserNotFoundException.class;

            when(repository.findById(userId)).thenThrow(exception);

            // when + then
            assertThrows(exception, () -> service.getById(userId));
        }

        @Test
        @DisplayName("Given null id, when getting user, then should should throw exception")
        void Given_NullId_When_GettingUser_Then_ShouldThrowException() {
            // given
            final Long userId = null;
            Class<UserNotFoundException> exception = UserNotFoundException.class;

            when(repository.findById(userId)).thenThrow(exception);

            // when + then
            assertThrows(exception, () -> service.getById(userId));
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

    @Nested
    @DisplayName("Is Admin")
    class IsAdmin {

    }

}