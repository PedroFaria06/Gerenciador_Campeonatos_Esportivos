import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../services/dashboard.service';
import { TeamService } from '../services/team.service';
import { Match } from '../models/match.interface';
import { ChampionshipTeamDTO } from '../models/championship-team.interface';
import { Championship } from '../models/championship.interface';
import { PageResponse } from '../models/page-response.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit {
  selectedChampionship: number | undefined;
  championships: Championship[] = [];
  currentMatches: Match[] = [];
  upcomingMatches: Match[] = [];
  standings: ChampionshipTeamDTO[] = [];
  teamNames: { [key: number]: string } = {};
  calendarDays: { day: number; hasGame: boolean; games?: Match[] }[] = [];
  loading = false;
  error = '';

  constructor(
    private dashboardService: DashboardService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.loadChampionships();
  }

  loadChampionships() {
    this.loading = true;
    this.dashboardService.getChampionships().subscribe({
      next: (response) => {
        this.championships = response.content;
        if (this.championships.length > 0) {
          this.selectedChampionship = this.championships[0].id;
          this.onChampionshipSelect();
        }
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
    if (!this.selectedChampionship) return;

    this.loading = true;
    this.error = '';

    this.dashboardService
      .getDashboardData(this.selectedChampionship)
      .subscribe({
        next: (data) => {
          this.standings = data.standings;
          this.processMatches(data.matches.content);
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar dados do dashboard:', error);
          this.error = 'Erro ao carregar dados do dashboard';
          this.loading = false;
        },
      });
  }

  private processMatches(matches: Match[]) {
    const now = new Date();

    this.currentMatches = matches.filter(
      (match) => match.status === 'IN_PROGRESS'
    );

    this.upcomingMatches = matches
      .filter(
        (match) =>
          match.status === 'SCHEDULED' && new Date(match.matchDate) > now
      )
      .sort(
        (a, b) =>
          new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime()
      )
      .slice(0, 5);

    this.loadTeamNames([...this.currentMatches, ...this.upcomingMatches]);

    this.processCalendar(this.upcomingMatches);
  }

  private loadTeamNames(matches: Match[]) {
    const teamIds = new Set(
      matches.flatMap((match) => [match.homeTeamId, match.awayTeamId])
    );

    teamIds.forEach((teamId) => {
      this.teamService.getTeamById(teamId).subscribe({
        next: (team) => {
          this.teamNames[teamId] = team.name;
        },
        error: (error) => {
          console.error(`Erro ao carregar time ${teamId}:`, error);
        },
      });
    });
  }

  private processCalendar(matches: Match[]) {
    if (matches.length === 0) return;

    const firstMatch = matches[0];
    const monthDate = new Date(firstMatch.matchDate);
    const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
    const lastDay = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0
    );

    this.calendarDays = [];

    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      this.calendarDays.push({ day: 0, hasGame: false });
    }

    for (let day = 1; day <= lastDay.getDate(); day++) {
      const gamesOnDay = matches.filter((match) => {
        const matchDate = new Date(match.matchDate);
        return (
          matchDate.getDate() === day &&
          matchDate.getMonth() === monthDate.getMonth() &&
          matchDate.getFullYear() === monthDate.getFullYear()
        );
      });

      this.calendarDays.push({
        day,
        hasGame: gamesOnDay.length > 0,
        games: gamesOnDay,
      });
    }
  }

  getTeamName(teamId: number): string {
    return this.teamNames[teamId] || 'Carregando...';
  }

  getMatchStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      SCHEDULED: 'Agendado',
      IN_PROGRESS: 'Em Andamento',
      FINISHED: 'Finalizado',
      CANCELLED: 'Cancelado',
    };
    return statusMap[status] || status;
  }
  getGamesTooltip(games: Match[] | undefined): string {
    if (!games || games.length === 0) return '';

    return games
      .map(
        (game) =>
          `${this.getTeamName(game.homeTeamId)} x ${this.getTeamName(
            game.awayTeamId
          )}`
      )
      .join('\n');
  }
}
