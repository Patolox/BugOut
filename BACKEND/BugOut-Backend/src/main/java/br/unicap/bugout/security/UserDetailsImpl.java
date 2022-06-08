package br.unicap.bugout.security;

import br.unicap.bugout.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserDetailsImpl implements UserDetails {

    @Serial
    private static final long serialVersionUID = 5472188424882374559L;


    @EqualsAndHashCode.Include
    private final Long id;
    private final String username;
    private final String email;
    @JsonIgnore
    private final String password;


    private final Collection<? extends GrantedAuthority> authorities;


    // ------------------------------------------------------------------------------------


    public UserDetailsImpl(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();

        this.authorities = List.of();
    }


    // ------------------------------------------------------------------------------------


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
