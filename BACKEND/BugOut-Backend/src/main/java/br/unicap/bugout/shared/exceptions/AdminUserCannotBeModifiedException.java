package br.unicap.bugout.shared.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Admin user cannot be modified!")
public class AdminUserCannotBeModifiedException extends RuntimeException{
}
