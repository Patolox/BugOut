package br.unicap.bugout.security;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtConfig {

    public static final String HEADER = "Authorization";
    public static final String PREFIX = "Bearer ";
    public static final int EXPIRATION = 86_400_000;
    public static final String SECRET = "MySecret";

}
