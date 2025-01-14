package com.soccer.championship.mapper;

import com.soccer.championship.domain.dto.PlayerDTO;
import com.soccer.championship.domain.entity.Player;
import com.soccer.championship.domain.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;

@Mapper(componentModel = "spring", uses = {TeamMapper.class})
public interface PlayerMapper {

    @Mapping(target = "teamId", source = "team.id")
    PlayerDTO toDTO(Player player);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "team", source = "teamId", qualifiedByName = "teamFromId")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Player toEntity(PlayerDTO dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "team", source = "teamId", qualifiedByName = "teamFromId")
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntity(PlayerDTO dto, @MappingTarget Player player);

    @Named("teamFromId")
    default Team teamFromId(Long id) {
        if (id == null) {
            return null;
        }
        Team team = new Team();
        team.setId(id);
        return team;
    }
}
