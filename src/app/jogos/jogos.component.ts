import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../services/match.service';
import { ChampionshipService } from '../services/championship.service';
import { Match, MatchStatus } from '../models/match.interface';
import {
  Championship,
  ChampionshipStatus,
} from '../models/championship.interface';
import { MatchPhase } from '../models/match-phase.interface';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.interface';
import { MatchEventService } from '../services/match-event.service';
import { MatchEvent } from '../models/match-event.interface';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css'],
})
export class JogosComponent implements OnInit {
  campeonatos: Championship[] = [];
  matches: Match[] = [];
  fases: MatchPhase[] = [];
  selectedCampeonato: number | undefined = undefined;
  loading = false;
  error = '';
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  statusOptions: { codigo: string; descricao: string }[] = [];
  teamNames: { [key: number]: string } = {};
  championshipData: Championship | null = null;
  showCreateMatchModal = false;
  availableTeams: Team[] = [];
  newMatch: Partial<Match> = {
    championshipId: undefined,
    homeTeamId: undefined,
    awayTeamId: undefined,
    matchDate: '',
    round: 1,
    status: 'SCHEDULED',
  };

  showEditMatchModal = false;
  selectedMatch: Match = {
    championshipId: 0,
    homeTeamId: 0,
    awayTeamId: 0,
    matchDate: '',
    round: 1,
    status: 'SCHEDULED',
    homeTeamGoals: 0,
    awayTeamGoals: 0,
  };
  matchEvents: MatchEvent[] = [];

  constructor(
    private matchService: MatchService,
    private championshipService: ChampionshipService,
    private teamService: TeamService,
    private matchEventService: MatchEventService
  ) {}

  ngOnInit(): void {
    this.loadChampionships();
    this.loadMatchStatus();
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

  loadMatchStatus() {
    this.matchService.getMatchStatus().subscribe({
      next: (status) => {
        this.statusOptions = status;
      },
      error: (error) => {
        console.error('Erro ao carregar status:', error);
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
    this.matchService
      .getMatchesByChampionship(championshipId, this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.matches = response.content;
          this.totalPages = response.totalPages;
          this.loadTeamNames();
          this.organizarMatchesEmFases();
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar partidas:', error);
          this.error = 'Erro ao carregar partidas';
          this.loading = false;
        },
      });
  }

  loadTeamNames() {
    const teamIds = new Set([
      ...this.matches.map((m) => m.homeTeamId),
      ...this.matches.map((m) => m.awayTeamId),
    ]);

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

  organizarMatchesEmFases() {
    this.fases = [
      {
        nome: 'Em Andamento',
        status: 'IN_PROGRESS',
        groups: [
          {
            nome: 'Partidas em Andamento',
            status: 'IN_PROGRESS',
            expanded: false,
            matches: this.matches.filter((m) => m.status === 'IN_PROGRESS'),
          },
        ],
      },
      {
        nome: 'Agendadas',
        status: 'SCHEDULED',
        groups: [
          {
            nome: 'Próximas Partidas',
            status: 'SCHEDULED',
            expanded: false,
            matches: this.matches.filter((m) => m.status === 'SCHEDULED'),
          },
        ],
      },
      {
        nome: 'Finalizadas',
        status: 'FINISHED',
        groups: [
          {
            nome: 'Partidas Concluídas',
            status: 'FINISHED',
            expanded: false,
            matches: this.matches.filter((m) => m.status === 'FINISHED'),
          },
        ],
      },
    ];
  }

  closeCreateMatchModal() {
    this.showCreateMatchModal = false;
    this.resetNewMatch();
  }

  loadAvailableTeams() {
    if (this.selectedCampeonato) {
      this.availableTeams = [];

      this.teamService.getTeams().subscribe({
        next: (response) => {
          this.availableTeams = response.content;
          console.log('Times disponíveis:', this.availableTeams);
        },
        error: (error) => {
          console.error('Erro ao carregar times:', error);
        },
      });
    }
  }

  openCreateMatchModal() {
    console.log('Abrindo modal...');
    this.showCreateMatchModal = true;
    this.loadAvailableTeams();
  }

  async createMatch() {
    if (this.validateNewMatch() && this.selectedCampeonato) {
      this.championshipService
        .getChampionshipById(this.selectedCampeonato)
        .subscribe({
          next: (championship) => {
            console.log('Status do campeonato:', championship.status);

            if (championship.status !== 'IN_PROGRESS') {
              const updatedChampionship: Championship = {
                id: championship.id,
                name: championship.name,
                startDate: championship.startDate,
                endDate: championship.endDate,
                season: championship.season,
                status: 'IN_PROGRESS' as ChampionshipStatus,
              };

              this.championshipService
                .updateChampionship(championship.id!, updatedChampionship)
                .subscribe({
                  next: () => {
                    this.createMatchProcess();
                  },
                  error: (error) => {
                    console.error('Erro ao ativar campeonato:', error);
                    alert('Erro ao ativar campeonato');
                  },
                });
            } else {
              this.createMatchProcess();
            }
          },
          error: (error) => {
            console.error('Erro ao verificar campeonato:', error);
            alert('Não foi possível verificar o status do campeonato');
          },
        });
    }
  }

  private createMatchProcess() {
    if (!this.selectedCampeonato) return;

    const matchToCreate: Match = {
      championshipId: this.selectedCampeonato,
      homeTeamId: this.newMatch.homeTeamId!,
      awayTeamId: this.newMatch.awayTeamId!,
      matchDate: new Date(this.newMatch.matchDate!).toISOString(),
      round: this.newMatch.round!,
      status: 'SCHEDULED',
    };

    this.matchService.createMatch(matchToCreate).subscribe({
      next: () => {
        this.closeCreateMatchModal();
        this.loadMatches(this.selectedCampeonato!);
        alert('Partida criada com sucesso!');
      },
      error: (error) => {
        console.error('Erro ao criar partida:', error);
        alert(error.error?.message || 'Erro ao criar partida');
      },
    });
  }
  validateNewMatch(): boolean {
    if (!this.newMatch.homeTeamId || !this.newMatch.awayTeamId) {
      alert('Selecione os times da partida');
      return false;
    }
    if (this.newMatch.homeTeamId === this.newMatch.awayTeamId) {
      alert('Os times devem ser diferentes');
      return false;
    }
    if (!this.newMatch.matchDate) {
      alert('Selecione a data da partida');
      return false;
    }
    if (!this.newMatch.round || this.newMatch.round < 1) {
      alert('Informe a rodada corretamente');
      return false;
    }
    return true;
  }

  resetNewMatch() {
    this.newMatch = {
      championshipId: undefined,
      homeTeamId: undefined,
      awayTeamId: undefined,
      matchDate: '',
      round: 1,
      status: 'SCHEDULED',
    };
    this.availableTeams = [];
  }

  openEditMatchModal(match: Match) {
    this.selectedMatch = { ...match };
    if (match.id) {
      this.loadMatchEvents(match.id);
    }
    this.showEditMatchModal = true;
  }

  closeEditMatchModal() {
    this.showEditMatchModal = false;
    this.matchEvents = [];
  }

  loadMatchEvents(matchId: number) {
    this.matchEventService.getMatchEvents(matchId).subscribe({
      next: (response) => {
        this.matchEvents = response.content;
      },
      error: (error) => {
        console.error('Erro ao carregar eventos:', error);
      },
    });
  }

  updateMatch() {
    if (this.selectedMatch?.id) {
      this.matchService
        .updateMatch(this.selectedMatch.id, this.selectedMatch)
        .subscribe({
          next: () => {
            if (this.selectedCampeonato) {
              this.loadMatches(this.selectedCampeonato);
            }
            this.closeEditMatchModal();
          },
          error: (error) => {
            console.error('Erro ao atualizar partida:', error);
          },
        });
    }
  }

  removeEvent(eventId: number | undefined) {
    if (!eventId) return;

    if (confirm('Deseja realmente remover este evento?')) {
      this.matchEventService.deleteMatchEvent(eventId).subscribe({
        next: () => {
          if (this.selectedMatch?.id) {
            this.loadMatchEvents(this.selectedMatch.id);
          }
        },
        error: (error) => {
          console.error('Erro ao remover evento:', error);
        },
      });
    }
  }

  toggleGrupo(grupo: any) {
    grupo.expanded = !grupo.expanded;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    if (this.selectedCampeonato) {
      this.loadMatches(this.selectedCampeonato);
    }
  }

  getTeamName(teamId: number): string {
    return this.teamNames[teamId] || `Time ${teamId}`;
  }

  getStatusDescription(status: MatchStatus): string {
    const statusMap: { [key in MatchStatus]: string } = {
      SCHEDULED: 'Agendado',
      IN_PROGRESS: 'Em Andamento',
      FINISHED: 'Finalizado',
      CANCELLED: 'Cancelado',
    };
    return statusMap[status] || status;
  }

  getEventTypeDescription(eventType: string): string {
    const eventTypes = {
      GOAL: 'Gol',
      YELLOW_CARD: 'Cartão Amarelo',
      RED_CARD: 'Cartão Vermelho',
      SUBSTITUTION: 'Substituição',
    };
    return eventTypes[eventType as keyof typeof eventTypes] || eventType;
  }
  playerNames: { [key: number]: string } = {};
  getPlayerName(playerId: number): string {
    return `Jogador ${playerId}`;
  }
}
