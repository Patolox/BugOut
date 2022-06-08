package br.unicap.bugout.user.model;

import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;

@Getter
@Setter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @NotNull(message = "O ID não pode ser nulo")
    @Column(nullable = false, unique = true, precision = 10)
    @PositiveOrZero(message = "O ID precisa ser um número positivo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_GENERATOR")
    @SequenceGenerator(name = "USER_GENERATOR", sequenceName = "USER_SEQUENCE", allocationSize = 1, initialValue = 2)
    private Long id;

    @NotBlank(message = "O username não pode estar vazio")
    @Column(nullable = false, unique = true, length = 30)
    @Length(max = 30, message = "O username deve ter no máximo {max} caracteres")
    private String username;

    @Email(message = "O email está fora do padrão")
    @NotBlank(message = "O email não pode estar vazio")
    @Column(nullable = false, unique = true, length = 50)
    @Length(max = 50, message = "O email deve ter no máximo {max} caracteres")
    private String email;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "A senha não pode estar vazia")
    @Length(min = 8, max = 100, message = "A senha deve ter entre {min} e {max} caracteres")
    private String password;

}
