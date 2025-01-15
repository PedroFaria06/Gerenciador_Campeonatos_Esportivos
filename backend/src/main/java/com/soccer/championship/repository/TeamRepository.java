package com.soccer.championship.repository;

import com.soccer.championship.domain.dto.TeamDTO;
import com.soccer.championship.domain.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {

  @Query("SELECT new com.soccer.championship.domain.dto.TeamDTO(t.id, t.name, t.foundationDate, t.city, t.state) FROM Team t")
  Page<TeamDTO> findAllTeams(Pageable pageable);

  @Query("SELECT new com.soccer.championship.domain.dto.TeamDTO(t.id, t.name, t.foundationDate, t.city, t.state) FROM Team t WHERE t.id = :id")
  TeamDTO findTeamById(Long id);

    Optional<Team> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);
}
