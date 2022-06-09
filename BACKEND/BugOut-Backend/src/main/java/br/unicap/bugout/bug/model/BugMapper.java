package br.unicap.bugout.bug.model;

import br.unicap.bugout.base.BaseConfig;
import br.unicap.bugout.base.BaseMapper;
import br.unicap.bugout.track.TrackService;
import br.unicap.bugout.user.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(config = BaseConfig.class)
public abstract class BugMapper implements BaseMapper<Bug, BugDTO> {

    @Autowired
    protected UserService userService;
    @Autowired
    protected TrackService trackService;

    // ------------------------------------------------------------------------------------


    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "track", expression = "java( trackService.getById(dto.getTrackId()) )")
    @Mapping(target = "user", expression = "java( dto.getUserId() != null ? userService.getById(dto.getUserId()) : null)")
    public abstract Bug toEntity(BugDTO dto);

    @Override
    @Mapping(target = "trackId", expression = "java( entity.getTrack().getId() )")
    @Mapping(target = "userId", expression = "java( entity.getUser() != null ? entity.getUser().getId() : null)")
    public abstract BugDTO toDTO(Bug entity);


    // ------------------------------------------------------------------------------------


    @Override
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "track", expression = "java( trackService.getById(dto.getTrackId()) )")
    @Mapping(target = "user", expression = "java( dto.getUserId() != null ? userService.getById(dto.getUserId()) : null)")
    public abstract Bug updateEntity(BugDTO dto, @MappingTarget Bug entity);

    @Override
    @Mapping(target = "trackId", expression = "java( entity.getTrack().getId() )")
    @Mapping(target = "userId", expression = "java( entity.getUser() != null ? entity.getUser().getId() : null)")
    public abstract BugDTO updateDTO(Bug entity, @MappingTarget BugDTO dto);

}
