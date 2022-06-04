package br.unicap.bugout.bug;

import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import javax.validation.constraints.Null;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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
    
    @PutMapping
    public ResponseEntity<BugDTO> assignToUser(@RequestBody BugDTO bugDTO){
        boolean exists = service.exists(bugDTO.getTitle(), bugDTO.getDescription());
        Bug bug = new Bug();
        if(!exists)
            throw new BugDoNotExistsException();

        Bug updatedBug = service.save(mapper.updateEntity(bugDTO, bug));
        return new ResponseEntity<>(mapper.toDTO(updatedBug), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<BugDTO> get(@RequestParam Long bugId) {
        Bug bug = service.getById(bugId);
        if(bug == null)
            throw new BugDoNotExistsException();
        return new ResponseEntity<BugDTO>(mapper.toDTO(bug), HttpStatus.OK);
    }

    @GetMapping(value="/all")
    public ResponseEntity<List<BugDTO>> getAll() {
        List<Bug> bugList = service.getAll();

        return new ResponseEntity<>(mapper.toDTOs(bugList), HttpStatus.OK);
    }
    
    

}
