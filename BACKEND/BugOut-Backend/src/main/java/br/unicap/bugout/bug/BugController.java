package br.unicap.bugout.bug;

import br.unicap.bugout.bug.exceptions.BugAlreadyExistsException;
import br.unicap.bugout.bug.exceptions.BugNotFoundException;
import br.unicap.bugout.bug.model.Bug;
import br.unicap.bugout.bug.model.BugDTO;
import br.unicap.bugout.bug.model.BugMapper;
import br.unicap.bugout.shared.AdminUserCannotBeModifiedException;
import br.unicap.bugout.shared.MessageDTO;
import br.unicap.bugout.shared.NoModificationException;
import br.unicap.bugout.user.UserService;
import br.unicap.bugout.user.exceptions.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Objects;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/bug")
public class BugController {

    private static final String PATH = "Bug";


    private final BugService service;
    private final BugMapper mapper;

    private final UserService userService;


    @GetMapping("/{id}")
    public ResponseEntity<BugDTO> getById(@PathVariable Long id) {
        log.info("{}/Get By ID - ID {}", PATH, id);

        Bug bug = service.getById(id);
        return ResponseEntity.ok(mapper.toDTO(bug));
    }

    @GetMapping
    public ResponseEntity<List<BugDTO>> getAll() {
        log.info("{}/Get All", PATH);

        List<Bug> list = service.getAll();
        return ResponseEntity.ok(mapper.toDTOs(list));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<BugDTO> create(@Valid @RequestBody BugDTO dto) {
        log.info("{}/Create", PATH);

        boolean exists = service.exists(dto.getTitle().trim());
        if (exists) throw new BugAlreadyExistsException();

        if (dto.getUserId() != null) {
            if (userService.isAdmin(dto.getUserId()))
                throw new AdminUserCannotBeModifiedException();

            if (!userService.existsById(dto.getUserId())) throw new UserNotFoundException();
        }

        Bug created = service.save(mapper.toEntity(dto));
        return new ResponseEntity<>(mapper.toDTO(created), HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<BugDTO> update(@PathVariable Long id, @Valid @RequestBody BugDTO dto) {   // TODO bug.getDescription().toLowerCase() -> description is optional
        log.info("{}/Update - ID {}", PATH, id);

        Bug bug = service.getById(id);


        String title = dto.getTitle().trim();
        String description = dto.getDescription() != null ? dto.getDescription().trim().toLowerCase() : null;

        Long bugUserId = bug.getUser() != null ? bug.getUser().getId() : null;

        if (bug.getTitle().equalsIgnoreCase(title) && Objects.equals(bug.getDescription().toLowerCase(), description)
            && Objects.equals(bugUserId, dto.getUserId()))
            throw new NoModificationException();

        boolean exists = service.existsOtherThanSelf(id, dto.getTitle());
        if (exists) throw new BugAlreadyExistsException();

        if (dto.getUserId() != null) {
            if (userService.isAdmin(dto.getUserId()))
                throw new AdminUserCannotBeModifiedException();

            if (!userService.existsById(dto.getUserId())) throw new UserNotFoundException();
        }


        Bug updated = service.save(mapper.updateEntity(dto, bug));
        return ResponseEntity.ok(mapper.toDTO(updated));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDTO> delete(@PathVariable Long id) {
        log.info("{}/Delete - ID {}", PATH, id);

        boolean exists = service.existsById(id);
        if (!exists) throw new BugNotFoundException();

        service.deleteById(id);
        return ResponseEntity.ok(new MessageDTO("Bug deletado com sucesso!"));
    }

}
