package br.unicap.bugout.user.model;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(config = BaseConfig.class)
public interface UserMapper extends BaseMapper<User, UserDTO> {

    @Override
    @Mapping(target = "id", ignore = true)
    User toEntity(UserDTO dto);

    @Override
    @Mapping(target = "password", ignore = true)
    UserDTO toDTO(User entity);


    // ------------------------------------------------------------------------------------


    @Override
    @Mapping(target = "id", ignore = true)
    User updateEntity(UserDTO dto, @MappingTarget User entity);

    @Override
    @Mapping(target = "password", ignore = true)
    UserDTO updateDTO(User entity, @MappingTarget UserDTO dto);

}
