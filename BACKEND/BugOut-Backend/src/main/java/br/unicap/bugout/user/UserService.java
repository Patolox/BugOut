package br.unicap.bugout.user;

import br.unicap.bugout.shared.AdminUserCannotBeModifiedException;
import br.unicap.bugout.shared.NoModificationException;
import br.unicap.bugout.user.exceptions.UserAlreadyExistsException;
import br.unicap.bugout.user.exceptions.UserNotFoundException;
import br.unicap.bugout.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;


    public User getById(@NotNull Long id) {
        return repository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    public List<User> getAll() {
        return repository.findAll();
    }

    public User create(@NotNull User user) {
        boolean exists = exists(user.getUsername(), user.getEmail());
        if (exists) throw new UserAlreadyExistsException();

        return repository.save(user);
    }

    public User update(@NotNull Long id, @NotNull User oldUser, @NotNull User newUser) {
        if (isAdmin(id)) throw new AdminUserCannotBeModifiedException();

        if (oldUser.getUsername().equalsIgnoreCase(newUser.getUsername()) && oldUser.getEmail().equalsIgnoreCase(newUser.getEmail()))
            throw new NoModificationException();

        boolean exists = existsOtherThanSelf(id, newUser.getUsername(), newUser.getEmail());
        if (exists) throw new UserAlreadyExistsException();


        return repository.save(newUser);
    }

    public void deleteById(@NotNull Long id) {
        if (isAdmin(id)) throw new AdminUserCannotBeModifiedException();

        boolean exists = existsById(id);
        if (!exists) throw new UserNotFoundException();

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

}
