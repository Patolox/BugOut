package br.unicap.bugout.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Slf4j
@RequiredArgsConstructor
public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    // We use auth manager to validate the user credentials
    private final AuthenticationManager authManager;
    private final JwtConfig jwtConfig;


    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authManager) {
        super(authManager);
        this.authManager = authManager;
        this.jwtConfig = new JwtConfig();
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        String username = "";
        try {

            // 1. Get credentials from request
            UserCredentials creds = new ObjectMapper().readValue(request.getInputStream(), UserCredentials.class);
            username = creds.username();

            // 2. Create auth object (contains credentials) which will be used by auth manager
            var authToken = new UsernamePasswordAuthenticationToken(username, creds.password(), Collections.emptyList());

            // 3. Authentication manager authenticate the user, and use
            // UserDetialsServiceImpl::loadUserByUsername() method to load the user.
            log.info("User trying to authenticate: " + username);
            return authManager.authenticate(authToken);
        } catch (BadCredentialsException ex) {
            log.info("Tentativa de autenticação inválida: Dados Incorretos. || username: " + username);
            throw new BadCredentialsException(
                    "Tentativa de autenticação inválida: Dados Incorretos.");
        } catch (UsernameNotFoundException ex) {
            log.error("Tentativa de autenticação inválida: Usuário não encontrado." + username);
            throw new UsernameNotFoundException(
                    "Tentativa de autenticação inválida: Usuário não encontrado.");
        } catch (DisabledException ex) {
            log.error("Tentativa de autenticação inválida: Usuário desativado | Username: " + username);
            throw new DisabledException(
                    "Tentativa de autenticação inválida: Usuário " + username + " desativado.");
        } catch (InternalAuthenticationServiceException ex) {
            log.error("\"Tentativa de autenticação inválida\" | Username: " + username);
            throw new InternalAuthenticationServiceException("\"Tentativa de autenticação inválida\" | Username: " + username);
        } catch (Exception e) {
            log.error("Tentativa de autenticação inválida", e);
            throw new RuntimeException("Tentativa de autenticação inválida", e);
        }
    }

    // Upon successful authentication, generate a token.
    // The 'auth' passed to successfulAuthentication() is the current authenticated
    // user.
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication auth) throws IOException {
        Date now = new Date();
        List<String> authorities = auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(toList());

        String token = Jwts.builder()
                .setSubject(auth.getName())
                .claim("authorities", authorities)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + JwtConfig.EXPIRATION))
                .signWith(SignatureAlgorithm.HS512, JwtConfig.SECRET.getBytes())
                .compact();

        // Add token to header
        response.addHeader(JwtConfig.HEADER, JwtConfig.PREFIX + token);

        UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();

        var responseBody = JwtResponseDTO.builder()
                .token(token)
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .email(userDetails.getEmail())
                .build();

        String json = new Gson().toJson(responseBody);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        log.info("User authenticated: " + userDetails.getUsername());
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException e) throws IOException, ServletException {

        response.setStatus(response.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> data = new HashMap<>();
        data.put("timestamp", Calendar.getInstance().getTime());
        data.put("exception", e.getMessage());

        response.getWriter().write(new Gson().toJson(data));
    }


    // ------------------------------------------------------------------------------------


    // A (temporary) class just to represent the user credentials
    private record UserCredentials(String username, String password) {
    }

}
