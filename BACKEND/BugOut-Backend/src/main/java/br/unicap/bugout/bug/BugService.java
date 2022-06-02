package br.unicap.bugout.bug;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BugService {

    private final BugRepository repository;

    public boolean exists(String title, String desc){
        return repository.existsByTitleOrDescription(title, desc);
    }

    public Bug save(Bug bug){
        return repository.save(bug);
    }
    
}
