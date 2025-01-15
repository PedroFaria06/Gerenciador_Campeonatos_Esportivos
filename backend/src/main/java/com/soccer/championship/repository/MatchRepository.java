package com.soccer.championship.repository;

import com.soccer.championship.domain.MatchStatus;
import com.soccer.championship.domain.entity.Match;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {

    Page<Match> findByChampionshipId(Long championshipId, Pageable pageable);

    List<Match> findByChampionshipIdAndRound(Long championshipId, Integer round);

    @Query("SELECT m FROM Match m WHERE m.championship.id = ?1 AND " +
           "(m.homeTeam.id = ?2 OR m.awayTeam.id = ?2)")
    List<Match> findByChampionshipIdAndTeamId(Long championshipId, Long teamId);

    List<Match> findByStatusAndMatchDateBetween(
        MatchStatus status,
        LocalDateTime startDate,
        LocalDateTime endDate
    );

    @Query("SELECT COUNT(m) > 0 FROM Match m WHERE m.championship.id = ?1 AND m.round = ?2 AND " +
           "(m.homeTeam.id = ?3 OR m.awayTeam.id = ?3)")
    boolean existsByChampionshipAndRoundAndTeam(Long championshipId, Integer round, Long teamId);
}
