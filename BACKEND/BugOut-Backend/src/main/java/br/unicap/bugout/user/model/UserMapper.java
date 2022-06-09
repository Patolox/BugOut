package br.unicap.bugout.user.model;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;
import br.unicap.bugout.user.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(config = BaseConfig.class)
public abstract class UserMapper implements BaseMapper<User, UserDTO> {

    @Autowired
    protected PasswordEncoder passwordEncoder;
    @Autowired
    protected UserService userService;


    @Override
    @Mapping(target = "password", expression = "java( dto.getPassword() != null ? passwordEncoder.encode(dto.getPassword()) " +
                                               ": dto.getId() != null ? userService.getById(dto.getId()).getPassword() : null )")
    public abstract User toEntity(UserDTO dto);


    // ------------------------------------------------------------------------------------


    @Override
    @Mapping(target = "password", expression = "java( dto.getPassword() != null ? passwordEncoder.encode(dto.getPassword()) " +
                                               ": dto.getId() != null ? userService.getById(dto.getId()).getPassword() : null )")
    public abstract User updateEntity(UserDTO dto, @MappingTarget User entity);

}
