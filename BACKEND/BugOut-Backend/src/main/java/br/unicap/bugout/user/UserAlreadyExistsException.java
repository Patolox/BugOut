package br.unicap.bugout.user;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "User already exists!")
public class UserAlreadyExistsException extends RuntimeException {
}
