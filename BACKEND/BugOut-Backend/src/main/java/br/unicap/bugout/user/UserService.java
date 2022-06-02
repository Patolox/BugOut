package br.unicap.bugout.user;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;

    public boolean exists(String username, String email) {
        return repository.existsByUsernameOrEmail(username, email);
    }

    public User save(User user) {
        return repository.save(user);
    }

    public User getUser(Long id){
        return repository.getById(id);
    }

    public List<User> getAllUsers(){
        return repository.findAll();
    }

    public User updateUser(User user){
        return repository.save(user);
    }

}
