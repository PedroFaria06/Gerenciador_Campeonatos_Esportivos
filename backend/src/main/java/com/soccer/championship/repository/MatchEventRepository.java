package com.soccer.championship.repository;


import com.soccer.championship.domain.entity.MatchEvent;
import com.soccer.championship.domain.enums.MatchEventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchEventRepository extends JpaRepository<MatchEvent, Long> {

  Page<MatchEvent> findByMatchId(Long matchId, Pageable pageable);

  List<MatchEvent> findByMatchIdAndEventType(Long matchId, MatchEventType eventType);

  @Query("SELECT e FROM MatchEvent e WHERE e.match.championship.id = ?1 AND e.player.id = ?2")
  List<MatchEvent> findByChampionshipIdAndPlayerId(Long championshipId, Long playerId);

  @Query("SELECT COUNT(e) FROM MatchEvent e WHERE e.match.championship.id = ?1 " +
    "AND e.player.id = ?2 AND e.eventType = ?3")
  long countByChampionshipAndPlayerAndEventType(
    Long championshipId,
    Long playerId,
    MatchEventType eventType
  );
}
