import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChampionshipService } from '../services/championship.service';
import { Championship } from '../models/championship.interface';
import { ChampionshipTeamDTO } from '../models/championship-team.interface';

@Component({
  selector: 'app-classificacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css'],
})
export class ClassificacaoComponent implements OnInit {
  campeonatos: Championship[] = [];
  selectedCampeonato: Championship | null = null;
  classification: ChampionshipTeamDTO[] = [];
  loading = false;
  error = '';

  constructor(private championshipService: ChampionshipService) {}

  ngOnInit() {
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

  onCampeonatoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue) {
      this.selectedCampeonato =
        this.campeonatos.find((c) => c.id === +selectedValue) || null;
      if (this.selectedCampeonato) {
        this.loadClassification(this.selectedCampeonato.id!);
      }
    } else {
      this.selectedCampeonato = null;
      this.classification = [];
    }
  }

  loadClassification(championshipId: number) {
    this.loading = true;
    this.championshipService
      .getChampionshipStandings(championshipId)
      .subscribe({
        next: (standings) => {
          this.classification = standings;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar classificação:', error);
          this.error = 'Erro ao carregar classificação';
          this.loading = false;
        },
      });
  }

  calculatePercentage(points: number, matches: number): string {
    if (matches === 0) return '0%';
    return ((points / (matches * 3)) * 100).toFixed(1) + '%';
  }
}
