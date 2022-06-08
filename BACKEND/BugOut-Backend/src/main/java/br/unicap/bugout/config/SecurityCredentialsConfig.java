package br.unicap.bugout.config;

import br.unicap.bugout.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity // Enable security config. This annotation denotes config for spring security.
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityCredentialsConfig extends WebSecurityConfigurerAdapter {

    private static final String[] OPEN_APIS = {"/h2-console/**"};


    // ------------------------------------------------------------------------------------

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private AuthEntryPointJwt authEntryPointJwt;
    @Autowired
    private AuthDeniedHandler authDeniedHandler;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // ------------------------------------------------------------------------------------

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder)
                .and()
                .inMemoryAuthentication()
                .withUser("admin")
                .password("password")
                .roles("ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .cors().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().exceptionHandling().accessDeniedHandler(authDeniedHandler).authenticationEntryPoint(authEntryPointJwt)
                .and().authorizeRequests()
                .antMatchers(OPEN_APIS).permitAll()
                .antMatchers(HttpMethod.POST, "/login", "/user").permitAll()
                .anyRequest().authenticated()
                .and().headers().frameOptions().sameOrigin()
                .and()
                .addFilterBefore(new JwtTokenAuthenticationFilter(), JwtUsernameAndPasswordAuthenticationFilter.class)
                .addFilterBefore(new JwtUsernameAndPasswordAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
    }

}
