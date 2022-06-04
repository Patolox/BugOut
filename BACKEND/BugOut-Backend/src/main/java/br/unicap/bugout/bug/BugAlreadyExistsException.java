package br.unicap.bugout.bug;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Bug already exists!")
public class BugAlreadyExistsException extends RuntimeException {}
