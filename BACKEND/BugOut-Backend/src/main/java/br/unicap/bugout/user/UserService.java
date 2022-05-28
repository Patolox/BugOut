package br.unicap.bugout.user;

import lombok.RequiredArgsConstructor;
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

}
