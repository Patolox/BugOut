package br.unicap.bugout.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.mapstruct.MappingTarget;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.unicap.bugout.shared.MessageDTO;

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

    @GetMapping
    public ResponseEntity<UserDTO> getUser(@RequestParam Long id){
        User user = service.getUser(id);

        return new ResponseEntity<>(mapper.toDTO(user), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        List<User> allUsers = service.getAllUsers();

        if(allUsers.isEmpty())
            throw new UserAlreadyExistsException();
        
        return new ResponseEntity<>(mapper.toDTOs(allUsers), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO dto){
        boolean exists = service.exists(dto.getUsername(), dto.getEmail());
        User user = new User();
        if (!exists)
            throw new UserAlreadyExistsException();

        User userUpdated = service.updateUser(mapper.updateEntity(dto, user));
        return new ResponseEntity<>(mapper.toDTO(userUpdated), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDTO> deleteUser(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.ok(new MessageDTO("Usuário deletado com sucesso!"));
    }

}
