package com.soccer.championship.domain.entity;

import com.soccer.championship.domain.ChampionshipStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "championships")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Championship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(nullable = false)
    private String season;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ChampionshipStatus status;

    @OneToMany(mappedBy = "championship", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ChampionshipTeam> teams = new HashSet<>();

    @OneToMany(mappedBy = "championship", cascade = CascadeType.ALL)
    private Set<Match> matches = new HashSet<>();

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

    public void addTeam(Team team) {
        ChampionshipTeam championshipTeam = new ChampionshipTeam();
        championshipTeam.setChampionship(this);
        championshipTeam.setTeam(team);
        championshipTeam.setPoints(0);
        championshipTeam.setMatchesPlayed(0);
        championshipTeam.setVictories(0);
        championshipTeam.setDraws(0);
        championshipTeam.setDefeats(0);
        championshipTeam.setGoalsFor(0);
        championshipTeam.setGoalsAgainst(0);
        teams.add(championshipTeam);
    }

    public void removeTeam(Team team) {
        teams.removeIf(championshipTeam -> championshipTeam.getTeam().equals(team));
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Championship that = (Championship) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
