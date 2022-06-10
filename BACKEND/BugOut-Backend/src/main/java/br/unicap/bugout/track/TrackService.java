package br.unicap.bugout.track;

import br.unicap.bugout.track.exceptions.TrackNotFoundException;
import br.unicap.bugout.track.model.Track;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.validation.constraints.NotNull;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TrackService {

    private final TrackRepository repository;


    public Track getById(@NotNull Long id) {
        return repository.findById(id).orElseThrow(TrackNotFoundException::new);
    }

    public List<Track> getAll() {
        return repository.findAll();
    }

}
