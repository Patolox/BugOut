package br.unicap.bugout.bug;

import br.unicap.bugout.bug.exceptions.BugAlreadyExistsException;
import br.unicap.bugout.bug.exceptions.BugNotFoundException;
import br.unicap.bugout.bug.model.Bug;
import br.unicap.bugout.shared.AdminUserCannotBeModifiedException;
import br.unicap.bugout.shared.NoModificationException;
import br.unicap.bugout.user.UserService;
import br.unicap.bugout.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

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

        if (bug.getUser() != null) {
            Long userId = bug.getUser().getId();

            if (userService.isAdmin(userId))
                throw new AdminUserCannotBeModifiedException();

            if (!userService.existsById(userId)) throw new UserNotFoundException();
        }

        return repository.save(bug);
    }

    public Bug update(@NotNull Long id, @NotNull Bug oldBug, @NotNull Bug newBug) {
        String title = newBug.getTitle();
        String description = newBug.getDescription() != null ? newBug.getDescription().toLowerCase() : null;

        Long oldBugUserId = oldBug.getUser() != null ? oldBug.getUser().getId() : null;
        Long newBugUserId = newBug.getUser() != null ? newBug.getUser().getId() : null;

        if (oldBug.getTitle().equalsIgnoreCase(title) && Objects.equals(oldBug.getDescription().toLowerCase(), description)
            && Objects.equals(oldBugUserId, newBugUserId))
            throw new NoModificationException();

        boolean exists = existsOtherThanSelf(id, newBug.getTitle());
        if (exists) throw new BugAlreadyExistsException();

        if (newBug.getUser() != null) {
            Long userId = newBug.getUser().getId();

            if (userService.isAdmin(userId))
                throw new AdminUserCannotBeModifiedException();

            if (!userService.existsById(userId)) throw new UserNotFoundException();
        }

        
        return repository.save(newBug);
    }

    public void deleteById(@NotNull Long id) {
        boolean exists = existsById(id);
        if (!exists) throw new BugNotFoundException();

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

}
