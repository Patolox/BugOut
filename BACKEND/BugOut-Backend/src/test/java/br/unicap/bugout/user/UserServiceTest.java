package br.unicap.bugout.user;

import br.unicap.bugout.user.exceptions.UserAlreadyExistsException;
import br.unicap.bugout.shared.services.AuthenticationService;
import br.unicap.bugout.user.exceptions.UserNotFoundException;
import br.unicap.bugout.user.model.User;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@DisplayName("UserService")
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository repository;
    @Mock
    PasswordEncoder passwordEncoder;
    @Mock
    AuthenticationService authenticationService;

    UserService service;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        service = new UserService(repository, passwordEncoder, authenticationService);
    }

    @AfterEach
    void tearDown() {
        service = null;
    }


    @Nested
    @DisplayName("Get By ID")
    class GetById {

        @Test
        @DisplayName("Should return corresponding user when given valid ID") //Deve retornar o usuário correspondente quando receber um ID válido
        void shouldReturnCorrespondingUserWhenGivenValidId() {
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
        @DisplayName("Should throw exception when given non valid ID") //Deve lançar exceção quando dado um ID inválido
        void shouldThrowExceptionWhenGivenNonValidId() {
            // given
            final Long userId = 0L;
            Class<UserNotFoundException> exception = UserNotFoundException.class;

            when(repository.findById(userId)).thenThrow(exception);

            // when + then
            assertThrows(exception, () -> service.getById(userId));
        }

        @Test 
        @Disabled
        @DisplayName("Should throw exception when given null ID") //Deve lançar uma exceção quando receber um ID nulo
        void shouldThrowExceptionWhenGivenNullId() {
            // given
            final Long userId = null;
            Class<UserNotFoundException> exception = UserNotFoundException.class;

            when(repository.findById(userId)).thenThrow(exception);

            // when + then
            assertThrows(exception, () -> service.getById(userId));
        }

    }

    @Nested
    @DisplayName("Get By Username")
    class GetByUsername {
        @Test
        @DisplayName("Should return corresponding user when given valid Username") //Deve retornar o usuário correspondente quando receber um ID válido
        void shouldReturnCorrespondingUserWhenGivenValidUsername() {
            // given
            final String username = "teste";
            final var user = User.builder().username(username).build();

            when(repository.findByUsername(username)).thenReturn(Optional.ofNullable(user));

            // when
            User answer = service.getByUsername(username);

            // then
            assertNotNull(answer);
            assertEquals(username, answer.getUsername());
        }

        @Test
        @DisplayName("Should throw exception when given non valid Username") //Deve lançar exceção quando dado um ID inválido
        void shouldThrowExceptionWhenGivenNonValidUsername() {
            // given
            final String username = "";
            Class<UserNotFoundException> exception = UserNotFoundException.class;

            when(repository.findByUsername(username)).thenThrow(exception);

            // when + then
            assertThrows(exception, () -> service.getByUsername(username));
        }
    }

    @Nested
    @DisplayName("Get Current User")
    class GetCurrentUser {

    }

    @Nested
    @DisplayName("Get All")
    class GetAll {

        @Test
        @DisplayName("Should return non empty list when given existing users") //Deve retornar uma lista não vazia quando fornecida a usuários existentes
        void shouldReturnNonEmptyListWhenGivenExistingUsers() {
            // given
            final List<User> list = List.of(User.builder().id(2L).build());
            when(repository.findAll()).thenReturn(list);

            // when
            final List<User> result = service.getAll();

            // then
            assertEquals(list.size(), result.size());
        }

        @Test
        @DisplayName("Should return empty list when given non existing users") //Deve retornar uma lista vazia quando fornecido a usuários não existentes
        void shouldReturnEmptyListWhenGivenNonExistingUsers() {
            // given
            when(repository.findAll()).thenReturn(List.of());

            // when
            final List<User> result = service.getAll();

            // then
            assertEquals(0, result.size());
        }

    }

    @Nested
    @DisplayName("Create")
    class Create {

        @Test
        @DisplayName("Should create user when given valid data")
        void shouldCreateUserWhenGivenValidData() {
            // given
            User user = User.builder().email("teste@teste.com").password("3232323233").username("teste").build();
            when(repository.save(user)).then(x -> {
                user.setId(2L);
                return user;
            });
            // when

            User answer = service.create(user);

            // then

            assertNotNull(answer);
            assertEquals(2L, answer.getId());
            assertEquals("teste", answer.getUsername());
            assertEquals("teste@teste.com", answer.getEmail());

        }

        @Test
        @DisplayName("Should throw exception when user already exists")
        void shouldThrowExceptionWhenUserAlreadyExists() {
            // given
            User user = User.builder().email("teste@teste.com").password("3232323233").username("teste").build();
            Class<UserAlreadyExistsException> exception = UserAlreadyExistsException.class;
            when(repository.save(user)).thenThrow(exception);
            // when + then

           assertThrows(exception, () -> service.create(user));

        }

        @Test // TODO configurar validação de parametos
        @Disabled
        @DisplayName("Should throw exception when user is null")
        void shouldThrowExceptionWhenUserIsNull() {
            // given
            User user = null;
            service.create(user);
            Class<UserAlreadyExistsException> exception = UserAlreadyExistsException.class;
            when(repository.save(user)).thenThrow(exception);
            // when + then

           assertThrows(exception, () -> service.create(user));

        }
    }

    @Nested
    @DisplayName("Update")
    class Update {

    }

    @Nested
    @DisplayName("Update Password")
    class UpdatePassword {

    }

    @Nested
    @DisplayName("Delete By ID")
    class DeleteById {

    }

    @Nested
    @DisplayName("Exists")
    class Exists {
        // given
            final String username = null;
            final String email = null;
        // when

        // then
    }


    @Nested
    @DisplayName("Exists Other Than Self")
    class ExistsOtherThanSelf {

    }

    @Nested
    @DisplayName("Is Admin")
    class IsAdmin {

        @Test
        @DisplayName("Should return true when given an admin id")
        void shouldReturnTrueWhenGivenAnAdminId() {
            // given
            final Long id = 1L;

            // when
            boolean answer = service.isAdmin(id);

            // then
            assertTrue(answer);
        }
        @Test
        @DisplayName("Should return false when given a non admin id")
        void shouldReturnFalseWhenGivenANonAdminId() {
            // given
            final Long id = 2L;

            // when
            boolean answer = service.isAdmin(id);

            // then
            assertFalse(answer);
        }

    }

}