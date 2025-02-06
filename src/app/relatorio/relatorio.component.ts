import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { RelatorioService } from '../services/relatorio.service';
import { Championship } from '../models/championship.interface';
import { Match } from '../models/match.interface';
import { ChampionshipTeamDTO } from '../models/championship-team.interface';
import { MatchEvent } from '../models/match-event.interface';
import { PageResponse } from '../models/page-response.interface';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css'],
})
export class RelatorioComponent implements OnInit {
  formVisible = false;
  isModalVisible = false;
  loading = false;

  selectedChampionship: number | undefined;
  selectedMatch: number | undefined;
  showSumula = false;
  showClassificacao = false;

  campeonatos: Championship[] = [];
  matches: Match[] = [];
  standings: ChampionshipTeamDTO[] = [];
  matchEvents: MatchEvent[] = [];

  constructor(private relatorioService: RelatorioService) {}

  ngOnInit(): void {
    this.loadChampionships();
  }

  loadChampionships(): void {
    this.loading = true;
    this.relatorioService.getChampionships().subscribe({
      next: (response: PageResponse<Championship>) => {
        this.campeonatos = response.content;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar campeonatos:', error);
        this.loading = false;
      },
    });
  }

  onChampionshipSelect(championshipId: number): void {
    if (!championshipId) return;

    this.loading = true;
    this.relatorioService.getMatchesByChampionship(championshipId).subscribe({
      next: (response: PageResponse<Match>) => {
        this.matches = response.content;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Erro ao carregar partidas:', error);
        this.loading = false;
      },
    });
  }

  generateReport(): void {
    if (!this.selectedChampionship) return;

    const requests: Observable<any>[] = [];

    if (this.showClassificacao) {
      requests.push(
        this.relatorioService.getStandings(this.selectedChampionship)
      );
    }

    if (this.showSumula && this.selectedMatch) {
      requests.push(this.relatorioService.getMatchEvents(this.selectedMatch));
    }

    if (requests.length > 0) {
      this.loading = true;
      forkJoin(requests).subscribe({
        next: (results: any[]) => {
          if (this.showClassificacao) {
            this.standings = results[0];
          }
          if (this.showSumula && this.selectedMatch) {
            this.matchEvents = results[1].content;
          }
          this.loading = false;
          this.openModal();
        },
        error: (error: any) => {
          console.error('Erro ao gerar relatório:', error);
          this.loading = false;
        },
      });
    } else {
      this.openModal();
    }
  }

  toggleForm(): void {
    this.formVisible = !this.formVisible;
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
