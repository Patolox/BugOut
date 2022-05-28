package br.unicap.bugout.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private static final String PATH = "User";


    private final UserService service;
    private final UserMapper mapper;


    @PostMapping
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO dto) {
        log.info("{}/Create", PATH);

        boolean exists = service.exists(dto.getUsername(), dto.getEmail());
        if (exists)
            throw new UserAlreadyExistsException();

        User created = service.save(mapper.toEntity(dto));
        return new ResponseEntity<>(mapper.toDTO(created), HttpStatus.CREATED);
    }

}
