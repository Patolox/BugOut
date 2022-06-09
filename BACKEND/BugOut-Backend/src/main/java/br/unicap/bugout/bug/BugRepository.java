package br.unicap.bugout.bug;

import br.unicap.bugout.bug.model.Bug;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BugRepository extends JpaRepository<Bug, Long> {

    @Override
    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH, attributePaths = {"track"})
    Optional<Bug> findById(Long id);

    @Override
    @EntityGraph(type = EntityGraph.EntityGraphType.FETCH, attributePaths = {"track"})
    List<Bug> findAll();

    boolean existsByTitleIgnoreCase(String title);

    @Query("""
                SELECT count(b) > 0 FROM Bug b
                WHERE b.id <> :id AND lower(b.title) = lower(:title)
            """)
    boolean existsOtherThanSelf(Long id, String title);

}
