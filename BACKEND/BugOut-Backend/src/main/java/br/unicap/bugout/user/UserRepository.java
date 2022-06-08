package br.unicap.bugout.user;

import br.unicap.bugout.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    boolean existsByUsernameIgnoreCaseOrEmailIgnoreCase(String username, String email);

    @Query("""
                SELECT count(u) > 0
                FROM User u
                WHERE u.id <> :id
                    AND (lower(u.username) = lower(:username) OR lower(u.email) = lower(:email))
            """)
    boolean existsOtherThanSelf(Long id, String username, String email);

}
