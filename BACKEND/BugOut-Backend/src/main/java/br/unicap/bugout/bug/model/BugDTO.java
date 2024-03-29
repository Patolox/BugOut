package br.unicap.bugout.bug.model;

import br.unicap.bugout.user.model.UserDTO;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class BugDTO {
    private Long id;
    @NotBlank(message = "O título não pode estar vazio")
    @Length(max = 100, message = "O título deve ter no máximo {max} caracteres")
    private String title;
    @Length(max = 500, message = "A descrição deve ter no máximo {max} caracteres")
    private String description;
    @NotNull(message = "O track do bug não pode ser nulo")
    private Long trackId;
    private Long userId;
    private UserDTO user;
}
