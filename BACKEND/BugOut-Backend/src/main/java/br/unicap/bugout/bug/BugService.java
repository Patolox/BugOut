package br.unicap.bugout.bug;

import br.unicap.bugout.bug.exceptions.BugNotFoundException;
import br.unicap.bugout.bug.model.Bug;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BugService {

    private final BugRepository repository;


    public Bug getById(Long id) {
        return repository.findById(id).orElseThrow(BugNotFoundException::new);
    }

    public List<Bug> getAll() {
        return repository.findAll();
    }

    public Bug save(Bug bug) {
        return repository.save(bug);
    }

    public void deleteById(Long id) {
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
