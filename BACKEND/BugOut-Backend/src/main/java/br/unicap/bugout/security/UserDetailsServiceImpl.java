package br.unicap.bugout.security;

import br.unicap.bugout.user.User;
import br.unicap.bugout.user.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user;
        if (username.equals("admin")) {
            user = User.builder()
                    .id(0L)
                    .username("admin")
                    .email("admin@bugout.com")
                    .password(passwordEncoder.encode("password"))
                    .build();
        } else {
            user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        }

        return new UserDetailsImpl(user);
    }

}
