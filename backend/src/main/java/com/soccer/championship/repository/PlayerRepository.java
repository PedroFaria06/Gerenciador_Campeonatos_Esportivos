package com.soccer.championship.repository;

import com.soccer.championship.domain.entity.Player;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    Page<Player> findByTeamId(Long teamId, Pageable pageable);

    List<Player> findByTeamId(Long teamId);

    boolean existsByTeamIdAndShirtNumber(Long teamId, Integer shirtNumber);

    @Query("SELECT p FROM Player p LEFT JOIN FETCH p.team WHERE p.id = :id")
    Optional<Player> findByIdWithTeam(@Param("id") Long id);
}
