package br.unicap.bugout.bug;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

import br.unicap.bugout.user.User;

@Getter
@Setter
public class BugDTO {
    private Long id;
    @NotBlank(message = "Título não pode estar vazio")
    @Length(max = 30, message = "O Título deve ter no máximo {max} caracteres")
    private String title;
    @Length(max = 240, message = "A descrição do bug deve ter no máximo {max} caracteres")
    private String description;
    private User assignedTo;
}
