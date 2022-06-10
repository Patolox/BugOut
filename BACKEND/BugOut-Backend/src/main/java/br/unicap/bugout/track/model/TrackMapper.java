package br.unicap.bugout.track.model;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;
import br.unicap.bugout.bug.model.BugMapper;
import org.mapstruct.Mapper;

@Mapper(config = BaseConfig.class, uses = BugMapper.class)
public interface TrackMapper extends BaseMapper<Track, TrackDTO> {
}
