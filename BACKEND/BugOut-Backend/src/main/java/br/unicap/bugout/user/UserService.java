package br.unicap.bugout.user;

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

    public User save(@NotNull User user) {
        return repository.save(user);
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

    public void deleteById(@NotNull Long id) {
        repository.deleteById(id);
    }

    public boolean isAdmin(@NotNull Long id) {
        return id == 1L;   // 1 = admin
    }

}
