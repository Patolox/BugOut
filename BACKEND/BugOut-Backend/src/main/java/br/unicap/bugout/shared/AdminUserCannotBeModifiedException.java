package br.unicap.bugout.shared;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Admin user cannot be modified!")
public class AdminUserCannotBeModifiedException extends RuntimeException{
}
