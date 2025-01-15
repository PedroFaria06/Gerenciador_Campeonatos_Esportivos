package com.soccer.championship.repository;

import com.soccer.championship.domain.entity.ChampionshipTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChampionshipTeamRepository extends JpaRepository<ChampionshipTeam, Long> {
    
    @Query("SELECT ct FROM ChampionshipTeam ct " +
           "WHERE ct.championship.id = :championshipId " +
           "AND ct.team.id = :teamId")
    Optional<ChampionshipTeam> findByChampionshipAndTeam(
            @Param("championshipId") Long championshipId,
            @Param("teamId") Long teamId);
}
