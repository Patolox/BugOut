package br.unicap.bugout.bug;

import java.util.List;

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

    public Bug getById(Long bugId){
        return repository.getById(bugId);
    }

    public List<Bug> getAll(){
        return repository.findAll();
    }
    
}
