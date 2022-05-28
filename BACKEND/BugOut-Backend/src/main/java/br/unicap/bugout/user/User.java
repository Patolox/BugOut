package br.unicap.bugout.user;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue
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
