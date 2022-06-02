package br.unicap.bugout.bug;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;

@Mapper(config = BaseConfig.class)
public interface BugMapper extends BaseMapper<Bug, BugDTO> {
    @Override
    @Mapping(target = "id", ignore = true)
    Bug toEntity(BugDTO bugDTO);
}
