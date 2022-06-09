package br.unicap.bugout.track.model;

import br.unicap.bugout.bug.model.Bug;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.Set;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Track {

    @Id
    @NotNull(message = "O ID não pode ser nulo")
    @Column(nullable = false, unique = true, precision = 10)
    @PositiveOrZero(message = "O ID precisa ser um número positivo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TRACK_GENERATOR")
    @SequenceGenerator(name = "TRACK_GENERATOR", sequenceName = "TRACK_SEQUENCE", allocationSize = 1)
    private Long id;

    @NotBlank(message = "O título não pode estar vazio")
    @Column(nullable = false, unique = true, length = 15)
    @Length(max = 15, message = "O título deve ter no máximo {max} caracteres")
    private String title;

    // ------------------------------------------------------------------------------------

    @OneToMany(mappedBy = "track", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Bug> bugs;

}
