package br.unicap.bugout.user.model;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

@Mapper(config = BaseConfig.class)
public abstract class UserMapper implements BaseMapper<User, UserDTO> {

    @Autowired
    protected PasswordEncoder passwordEncoder;


    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", expression = "java( passwordEncoder.encode(dto.getPassword()) )")
    public abstract User toEntity(UserDTO dto);

    @Override
    @Mapping(target = "password", ignore = true)
    public abstract UserDTO toDTO(User entity);


    // ------------------------------------------------------------------------------------


    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", expression = "java( passwordEncoder.encode(dto.getPassword()) )")
    public abstract User updateEntity(UserDTO dto, @MappingTarget User entity);

    @Override
    @Mapping(target = "password", ignore = true)
    public abstract UserDTO updateDTO(User entity, @MappingTarget UserDTO dto);

}
