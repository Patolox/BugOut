package br.unicap.bugout.bug.model;

import br.unicap.bugout.user.model.User;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Bug {

    @Id
    @NotNull(message = "O ID não pode ser nulo")
    @Column(nullable = false, unique = true, precision = 10)
    @PositiveOrZero(message = "O ID precisa ser um número positivo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "BUG_GENERATOR")
    @SequenceGenerator(name = "BUG_GENERATOR", sequenceName = "BUG_SEQUENCE", allocationSize = 1)
    private Long id;

    @NotBlank(message = "O título não pode estar vazio")
    @Column(nullable = false, unique = true, length = 100)
    @Length(max = 100, message = "O título deve ter no máximo {max} caracteres")
    private String title;

    @Column(length = 500)
    @Length(max = 500, message = "A descrição deve ter no máximo {max} caracteres")
    private String description;

    @ManyToOne
    @JoinColumn(name = "FK_USER")
    private User user;

}
