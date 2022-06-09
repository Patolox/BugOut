package br.unicap.bugout.bug;

import br.unicap.bugout.bug.model.Bug;
import br.unicap.bugout.bug.model.BugDTO;
import br.unicap.bugout.bug.model.BugMapper;
import br.unicap.bugout.shared.MessageDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/bug")
public class BugController {

    private static final String PATH = "Bug";


    private final BugService service;
    private final BugMapper mapper;


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

        Bug created = service.create(mapper.toEntity(dto));
        return new ResponseEntity<>(mapper.toDTO(created), HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<BugDTO> update(@PathVariable Long id, @Valid @RequestBody BugDTO dto) {
        log.info("{}/Update - ID {}", PATH, id);

        Bug bug = service.getById(id);

        Bug updated = service.update(id, mapper.updateEntity(dto, bug));
        return ResponseEntity.ok(mapper.toDTO(updated));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDTO> delete(@PathVariable Long id) {
        log.info("{}/Delete - ID {}", PATH, id);

        service.deleteById(id);
        return ResponseEntity.ok(new MessageDTO("Bug deletado com sucesso!"));
    }

}
