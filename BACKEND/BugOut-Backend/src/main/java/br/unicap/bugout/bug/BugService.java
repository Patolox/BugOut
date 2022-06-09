package br.unicap.bugout.bug;

import br.unicap.bugout.bug.exceptions.BugAlreadyExistsException;
import br.unicap.bugout.bug.exceptions.BugNotFoundException;
import br.unicap.bugout.bug.model.Bug;
import br.unicap.bugout.shared.AdminUserCannotBeModifiedException;
import br.unicap.bugout.user.UserService;
import br.unicap.bugout.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BugService {

    private final BugRepository repository;

    private final UserService userService;


    public Bug getById(@NotNull Long id) {
        return repository.findById(id).orElseThrow(BugNotFoundException::new);
    }

    public List<Bug> getAll() {
        return repository.findAll();
    }

    public Bug create(@NotNull Bug bug) {
        boolean exists = exists(bug.getTitle());
        if (exists) throw new BugAlreadyExistsException();

        verifyAssignedTo(bug.getUser());

        return repository.save(bug);
    }

    public Bug update(@NotNull Long id, @NotNull Bug bug) {
        verifyExists(id);

        boolean exists = existsOtherThanSelf(id, bug.getTitle());
        if (exists) throw new BugAlreadyExistsException();

        verifyAssignedTo(bug.getUser());

        return repository.save(bug);
    }

    public void deleteById(@NotNull Long id) {
        verifyExists(id);
        repository.deleteById(id);
    }

    public boolean exists(@NotBlank String title) {
        return repository.existsByTitleIgnoreCase(title);
    }

    public boolean existsById(@NotNull Long id) {
        return repository.existsById(id);
    }

    public boolean existsOtherThanSelf(@NotNull Long id, @NotBlank String title) {
        return repository.existsOtherThanSelf(id, title);
    }

    private void verifyExists(@NotNull Long id) {
        boolean exists = existsById(id);
        if (!exists) throw new BugNotFoundException();
    }

    private void verifyAssignedTo(User user) {
        if (user != null && userService.isAdmin(user.getId()))
            throw new AdminUserCannotBeModifiedException();
    }

}
