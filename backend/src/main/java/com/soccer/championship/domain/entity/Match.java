package com.soccer.championship.domain.entity;

import com.soccer.championship.domain.enums.MatchStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "matches")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Match {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "championship_id", nullable = false)
  private Championship championship;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "home_team_id", nullable = false)
  private Team homeTeam;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "away_team_id", nullable = false)
  private Team awayTeam;

  @Column(name = "match_date", nullable = false)
  private LocalDateTime matchDate;

  @Column(name = "home_team_goals")
  private Integer homeTeamGoals;

  @Column(name = "away_team_goals")
  private Integer awayTeamGoals;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private MatchStatus status;

  private Integer round;

  @OneToMany(mappedBy = "match", cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<MatchEvent> events = new HashSet<>();

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

  public void addEvent(MatchEvent event) {
    events.add(event);
    event.setMatch(this);
  }

  public void removeEvent(MatchEvent event) {
    events.remove(event);
    event.setMatch(null);
  }
}
