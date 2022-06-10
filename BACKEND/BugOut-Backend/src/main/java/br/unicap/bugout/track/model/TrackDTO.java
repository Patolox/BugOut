package br.unicap.bugout.track.model;

import br.unicap.bugout.bug.model.BugDTO;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import java.util.Set;

@Getter
@Setter
public class TrackDTO {
    private Long id;
    @NotBlank(message = "O título não pode estar vazio")
    @Length(max = 15, message = "O título deve ter no máximo {max} caracteres")
    private String title;
    private Set<BugDTO> bugs;
}
