package br.unicap.bugout.user;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.Collection;
import java.util.Set;

@Mapper(config = BaseConfig.class)
public interface UserMapper extends BaseMapper<User, UserDTO> {

    @Override
    @Mapping(target = "id", ignore = true)
    User toEntity(UserDTO dto);

}
