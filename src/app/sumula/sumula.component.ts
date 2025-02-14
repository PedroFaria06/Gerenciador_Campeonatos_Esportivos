import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChampionshipService } from '../services/championship.service';
import { MatchService } from '../services/match.service';
import { MatchEventService } from '../services/match-event.service';
import { TeamService } from '../services/team.service';
import { Championship } from '../models/championship.interface';
import { Match } from '../models/match.interface';
import { MatchEvent, EventType } from '../models/match-event.interface';
import { MatchDetails } from '../models/match-details.interface';
import { PlayerMatch } from '../models/player-match.interface';
import { PlayerService } from '../services/player.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sumula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sumula.component.html',
  styleUrls: ['./sumula.component.css'],
})
export class SumulaComponent implements OnInit {
  campeonatos: Championship[] = [];
  matches: Match[] = [];
  selectedCampeonato: number | null = null;
  selectedMatch: number | null = null;
  matchDetails: MatchDetails | null = null;
  loading = false;
  error = '';
  teamNames: { [key: number]: string } = {};

  constructor(
    private championshipService: ChampionshipService,
    private matchService: MatchService,
    private matchEventService: MatchEventService,
    private teamService: TeamService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.loadChampionships();
  }

  loadChampionships() {
    this.loading = true;
    this.championshipService.getChampionships().subscribe({
      next: (response) => {
        this.campeonatos = response.content;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar campeonatos:', error);
        this.error = 'Erro ao carregar campeonatos';
        this.loading = false;
      },
    });
  }

  onChampionshipSelect() {
    if (this.selectedCampeonato) {
      this.loadMatches(this.selectedCampeonato);
    }
  }

  loadMatches(championshipId: number) {
    this.loading = true;
    this.matchService.getMatchesByChampionship(championshipId).subscribe({
      next: (response) => {
        this.matches = response.content;
        this.loadTeamNames();
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar partidas:', error);
        this.error = 'Erro ao carregar partidas';
        this.loading = false;
      },
    });
  }

  onMatchSelect() {
    if (this.selectedMatch) {
      this.loadMatchDetails(this.selectedMatch);
    }
  }

  loadMatchDetails(matchId: number) {
    this.loading = true;

    this.matchService.getMatchById(matchId).subscribe({
      next: (match) => {
        const homeTeam$ = this.teamService.getTeamById(match.homeTeamId);
        const awayTeam$ = this.teamService.getTeamById(match.awayTeamId);
        const events$ = this.matchEventService.getMatchEvents(matchId);

        forkJoin({
          homeTeam: homeTeam$,
          awayTeam: awayTeam$,
          events: events$,
        }).subscribe({
          next: ({ homeTeam, awayTeam, events }) => {
            this.matchDetails = {
              id: match.id!,
              championshipId: match.championshipId,
              matchDate: match.matchDate,
              location: 'Local a definir',
              referee: 'Árbitro a definir',
              homeTeam: {
                id: homeTeam.id!,
                name: homeTeam.name,
                coach: 'Técnico a definir',
                players: [],
              },
              awayTeam: {
                id: awayTeam.id!,
                name: awayTeam.name,
                coach: 'Técnico a definir',
                players: [],
              },
              events: events.content,
            };

            forkJoin({
              homePlayers: this.playerService.getPlayersByTeam(
                match.homeTeamId
              ),
              awayPlayers: this.playerService.getPlayersByTeam(
                match.awayTeamId
              ),
            }).subscribe({
              next: ({ homePlayers, awayPlayers }) => {
                if (this.matchDetails) {
                  this.matchDetails.homeTeam.players = homePlayers.content.map(
                    (player) => ({
                      playerId: player.id!,
                      matchId: matchId,
                      shirtNumber: player.shirtNumber,
                      isStarter: true,
                      position: player.position,
                      playerName: player.name,
                    })
                  );

                  this.matchDetails.awayTeam.players = awayPlayers.content.map(
                    (player) => ({
                      playerId: player.id!,
                      matchId: matchId,
                      shirtNumber: player.shirtNumber,
                      isStarter: true,
                      position: player.position,
                      playerName: player.name,
                    })
                  );
                }
                this.loading = false;
              },
              error: (error) => {
                console.error('Erro ao carregar jogadores:', error);
                this.error = 'Erro ao carregar jogadores dos times';
                this.loading = false;
              },
            });
          },
          error: (error) => {
            console.error('Erro ao carregar detalhes:', error);
            this.error = 'Erro ao carregar detalhes da partida';
            this.loading = false;
          },
        });
      },
      error: (error) => {
        console.error('Erro ao carregar partida:', error);
        this.error = 'Erro ao carregar partida';
        this.loading = false;
      },
    });
  }

  loadTeamNames() {
    const teamIds = new Set(
      this.matches.flatMap((m) => [m.homeTeamId, m.awayTeamId])
    );

    teamIds.forEach((teamId) => {
      this.teamService.getTeamById(teamId).subscribe({
        next: (team) => {
          this.teamNames[teamId] = team.name;
        },
        error: (error) => {
          console.error(`Erro ao carregar nome do time ${teamId}:`, error);
        },
      });
    });
  }

  getTeamName(teamId: number): string {
    return this.teamNames[teamId] || `Time ${teamId}`;
  }

  getStarterPlayers(players: PlayerMatch[] | undefined): PlayerMatch[] {
    if (!players) return [];
    return players.filter((player) => player.isStarter);
  }

  getEventTypeDescription(type: EventType): string {
    const typeMap: Record<EventType, string> = {
      GOAL: 'Gol',
      YELLOW_CARD: 'Cartão Amarelo',
      RED_CARD: 'Cartão Vermelho',
      SUBSTITUTION: 'Substituição',
      PENALTY_MISSED: 'Pênalti perdido',
      PENALTY_SCORED: 'Pênalti convertido',
    };
    return typeMap[type];
  }

  getPlayerName(playerId: number): string {
    if (!this.matchDetails) return 'Jogador não encontrado';

    const homePlayer = this.matchDetails.homeTeam?.players.find(
      (p) => p.playerId === playerId
    );
    const awayPlayer = this.matchDetails.awayTeam?.players.find(
      (p) => p.playerId === playerId
    );
    return (
      homePlayer?.playerName ||
      awayPlayer?.playerName ||
      'Jogador não encontrado'
    );
  }

  getPlayerNumber(playerId: number): number {
    if (!this.matchDetails) return 0;

    const homePlayer = this.matchDetails.homeTeam?.players.find(
      (p) => p.playerId === playerId
    );
    const awayPlayer = this.matchDetails.awayTeam?.players.find(
      (p) => p.playerId === playerId
    );
    return homePlayer?.shirtNumber || awayPlayer?.shirtNumber || 0;
  }
}
