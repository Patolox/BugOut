package br.unicap.bugout.bug;

import org.hibernate.sql.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {

    Optional<Bug> findById(Long id);
    List<Bug> findAll();

    // void save(Bug bug);
    void update(Bug bug);
    void delete(Long id);
    void assignToUser(Long  bugId, Long userId);

}
