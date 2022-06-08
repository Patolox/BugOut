package br.unicap.bugout.bug.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "Bug not found!")
public class BugNotFoundException extends RuntimeException {}
