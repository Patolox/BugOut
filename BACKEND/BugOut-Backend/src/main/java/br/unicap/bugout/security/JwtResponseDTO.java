package br.unicap.bugout.security;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class JwtResponseDTO {
    private static final String TYPE = "Bearer";

    private String token;
    private Long id;
    private String username;
    private String email;
}
