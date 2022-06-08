package br.unicap.bugout.bug;

import br.unicap.bugout.bug.model.Bug;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {

    boolean existsByTitleIgnoreCase(String title);

    @Query("""
                SELECT count(b) > 0 FROM Bug b
                WHERE b.id <> :id AND lower(b.title) = lower(:title)
            """)
    boolean existsOtherThanSelf(Long id, String title);

}
