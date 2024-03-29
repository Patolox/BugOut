package br.unicap.bugout.user;

import br.unicap.bugout.shared.exceptions.AdminUserCannotBeModifiedException;
import br.unicap.bugout.shared.services.AuthenticationService;
import br.unicap.bugout.user.exceptions.UserAlreadyExistsException;
import br.unicap.bugout.user.exceptions.UserNotFoundException;
import br.unicap.bugout.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@Valid
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationService authenticationService;


    public User getById(@NotNull Long id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public User getByUsername(@NotBlank String username) {
        return repository.findByUsername(username).orElseThrow(UserNotFoundException::new);
    }

    public User getCurrentUser() {
        return getByUsername(authenticationService.getUsername());
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public User create(@Valid @NotNull User user) {
        boolean exists = exists(user.getUsername(), user.getEmail());
        if (exists) throw new UserAlreadyExistsException();

        return repository.save(user);
    }

    public User update(@NotNull Long id, @NotNull User user) {
        verifyExists(id);

        if (isAdmin(id)) throw new AdminUserCannotBeModifiedException();

        boolean exists = existsOtherThanSelf(id, user.getUsername(), user.getEmail());
        if (exists) throw new UserAlreadyExistsException();

        return repository.save(user);
    }

    public void updatePassword(@NotBlank String password) {
        User user = getCurrentUser();
        user.setPassword(passwordEncoder.encode(password.trim()));

        repository.save(user);
    }

    public void deleteById(@NotNull Long id) {  // TODO desfazer a associação com o bug (não apagar o bug) na hora dp delete
        if (isAdmin(id)) throw new AdminUserCannotBeModifiedException();

        verifyExists(id);

        repository.deleteById(id);
    }

    public boolean existsById(@NotNull Long id) {
        return repository.existsById(id);
    }

    public boolean exists(@NotBlank String username, @NotBlank String email) {
        return repository.existsByUsernameIgnoreCaseOrEmailIgnoreCase(username, email);
    }

    public boolean existsOtherThanSelf(@NotNull Long id, @NotBlank String username, @NotBlank String email) {
        return repository.existsOtherThanSelf(id, username, email);
    }

    public boolean isAdmin(@NotNull Long id) {
        return id == 1L;   // 1 = admin
    }

    public void verifyExists(@NotNull Long id) {
        boolean exists = existsById(id);
        if (!exists) throw new UserNotFoundException();
    }

}
