package br.unicap.bugout.shared;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "No modification to the existing entity is being made!")
public class NoModificationException extends RuntimeException {
}
