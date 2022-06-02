package br.unicap.bugout.bug;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/bug")
public class BugController {

    private final BugService service;
    private final BugMapper mapper;

    @PostMapping
    public ResponseEntity<BugDTO> create(@RequestBody BugDTO bugDTO){
        boolean exists = service.exists(bugDTO.getTitle(), bugDTO.getDescription());

        if(exists)
            throw new BugAlreadyExistsException();

        Bug bugCreated = service.save(mapper.toEntity(bugDTO));
        return new ResponseEntity<>(mapper.toDTO(bugCreated), HttpStatus.CREATED);
    }
    
    public void assignToUser(Long  bugId, Long userId){
        
    }

}
