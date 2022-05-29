package br.unicap.bugout.bug;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

import br.unicap.bugout.user.User;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Bug {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Título não pode estar vazio")
    @Length(max = 30, message = "O Título deve ter no máximo {max} caracteres")
    private String title;

    @Length(max = 240, message = "A descrição do bug deve ter no máximo {max} caracteres")
    private String description;

    private User assignedTo;

}
