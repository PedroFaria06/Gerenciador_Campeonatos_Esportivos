package com.soccer.championship.repository;

import com.soccer.championship.domain.entity.Championship;
import com.soccer.championship.domain.enums.ChampionshipStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChampionshipRepository extends JpaRepository<Championship, Long> {

    Page<Championship> findByStatus(ChampionshipStatus status, Pageable pageable);

    @Query("SELECT c FROM Championship c WHERE c.status = ?1 AND c.id IN " +
           "(SELECT ct.championship.id FROM ChampionshipTeam ct WHERE ct.team.id = ?2)")
    List<Championship> findByStatusAndTeamId(ChampionshipStatus status, Long teamId);

    boolean existsByNameAndSeason(String name, String season);
}
