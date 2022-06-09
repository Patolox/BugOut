package br.unicap.bugout.track.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Track already exists!")
public class TrackAlreadyExistsException extends RuntimeException {}
