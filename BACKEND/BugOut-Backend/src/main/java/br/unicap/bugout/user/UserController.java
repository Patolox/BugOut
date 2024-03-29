package br.unicap.bugout.user;

import br.unicap.bugout.shared.model.MessageDTO;
import br.unicap.bugout.shared.model.OneAttributeDTO;
import br.unicap.bugout.user.model.User;
import br.unicap.bugout.user.model.UserDTO;
import br.unicap.bugout.user.model.UserMapper;
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
@RequestMapping("/user")
public class UserController {

    private static final String PATH = "User";


    private final UserService service;
    private final UserMapper mapper;


    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Long id) {
        log.info("{}/Get By ID - ID {}", PATH, id);

        User user = service.getById(id);
        return ResponseEntity.ok(mapper.toDTO(user));
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAll() {
        log.info("{}/Get All", PATH);

        List<User> list = service.getAll();
        return ResponseEntity.ok(mapper.toDTOs(list));
    }

    @PostMapping
    @Transactional
    public ResponseEntity<UserDTO> create(@Valid @RequestBody UserDTO dto) {
        log.info("{}/Create", PATH);

        User created = service.create(mapper.toEntity(dto));
        return new ResponseEntity<>(mapper.toDTO(created), HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserDTO dto) {
        log.info("{}/Update - ID {}", PATH, id);

        User updated = service.update(id, mapper.toEntity(dto));
        return ResponseEntity.ok(mapper.toDTO(updated));
    }

    @Transactional
    @PatchMapping("/password")
    public ResponseEntity<MessageDTO> updatePassword(@Valid @RequestBody OneAttributeDTO<String> dto) {
        log.info("{}/Update/Password", PATH);

        service.updatePassword(dto.data());
        return ResponseEntity.ok(new MessageDTO("Senha atualizada com sucesso!"));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDTO> delete(@PathVariable Long id) {
        log.info("{}/Delete - ID {}", PATH, id);

        service.deleteById(id);
        return ResponseEntity.ok(new MessageDTO("Usuário deletado com sucesso!"));
    }

}
