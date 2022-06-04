package br.unicap.bugout.bug;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Bug don`t exists!")
public class BugDoNotExistsException extends RuntimeException {}
