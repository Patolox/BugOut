package br.unicap.bugout.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        log.error("Unauthorized error: {}", authException.getMessage());
        authException.printStackTrace();

        Map<String, Object> data = new HashMap<>();
        data.put("exception", authException.getMessage());
        data.put("timestamp", new Timestamp(System.currentTimeMillis()));

        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.getOutputStream().println(objectMapper.writeValueAsString(data));
    }

}
