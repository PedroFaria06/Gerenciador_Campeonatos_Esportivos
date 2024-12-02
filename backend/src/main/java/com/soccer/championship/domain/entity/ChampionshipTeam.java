package com.soccer.championship.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Objects;

@Entity
@Table(name = "championship_teams")
@Getter
@Setter
public class ChampionshipTeam {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "championship_id", nullable = false)
  private Championship championship;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "team_id", nullable = false)
  private Team team;

  @Column(nullable = false)
  private Integer points = 0;

  @Column(name = "matches_played", nullable = false)
  private Integer matchesPlayed = 0;

  @Column(nullable = false)
  private Integer victories = 0;

  @Column(nullable = false)
  private Integer draws = 0;

  @Column(nullable = false)
  private Integer defeats = 0;

  @Column(name = "goals_for", nullable = false)
  private Integer goalsFor = 0;

  @Column(name = "goals_against", nullable = false)
  private Integer goalsAgainst = 0;

  public ChampionshipTeam() {
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    ChampionshipTeam that = (ChampionshipTeam) o;
    return Objects.equals(id, that.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  @Transient
  public Integer getGoalDifference() {
    return goalsFor - goalsAgainst;
  }
}
