package br.unicap.bugout.user.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserDTO {
    private Long id;
    @NotBlank(message = "O username não pode estar vazio")
    @Length(max = 30, message = "O username deve ter no máximo {max} caracteres")
    private String username;
    @Email(message = "O email está fora do padrão")
    @NotBlank(message = "O email não pode estar vazio")
    @Length(max = 50, message = "O email deve ter no máximo {max} caracteres")
    private String email;
    private String password;
}
