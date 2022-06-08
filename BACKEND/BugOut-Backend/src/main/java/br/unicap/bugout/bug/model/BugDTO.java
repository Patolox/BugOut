package br.unicap.bugout.bug.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class BugDTO {
    private Long id;
    @NotBlank(message = "O título não pode estar vazio")
    @Length(max = 100, message = "O título deve ter no máximo {max} caracteres")
    private String title;
    @Length(max = 500, message = "A descrição deve ter no máximo {max} caracteres")
    private String description;
    private Long userId;
}
