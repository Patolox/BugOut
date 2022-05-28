package br.unicap.bugout.user;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class UserDTO {
    private Long id;
    @NotBlank(message = "Username não pode estar vazio")
    @Length(max = 30, message = "O username deve ter no máximo {max} caracteres")
    private String username;
    @Email
    @NotBlank(message = "O email não pode estar vazio")
    private String email;
    @NotBlank(message = "A senha não pode estar vazia")
    @Length(min = 8, message = "A senha deve ter no minimo {min} caracteres")
    private String password;
}
