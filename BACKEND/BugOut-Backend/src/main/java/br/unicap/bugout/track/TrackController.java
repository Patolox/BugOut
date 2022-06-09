package br.unicap.bugout.track;

import br.unicap.bugout.track.model.Track;
import br.unicap.bugout.track.model.TrackDTO;
import br.unicap.bugout.track.model.TrackMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/track")
public class TrackController {

    private static final String PATH = "Track";


    private final TrackService service;
    private final TrackMapper mapper;


    @GetMapping("/{id}")
    public ResponseEntity<TrackDTO> getById(@PathVariable Long id) {
        log.info("{}/Get By ID - ID {}", PATH, id);

        Track track = service.getById(id);
        return ResponseEntity.ok(mapper.toDTO(track));
    }

    @GetMapping
    public ResponseEntity<List<TrackDTO>> getAll() {
        log.info("{}/Get All", PATH);

        List<Track> list = service.getAll();
        return ResponseEntity.ok(mapper.toDTOs(list));
    }

}
