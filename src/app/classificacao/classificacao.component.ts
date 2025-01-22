import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classificacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './classificacao.component.html',
  styleUrls: ['./classificacao.component.css']
})
export class ClassificacaoComponent {
  formVisible = false;
  selectedCampeonato: any;

  campeonatos = [
    { id: 0, nome: 'Todos' },
    { id: 1, nome: 'Campeonato Brasileiro' },
    { id: 2, nome: 'Campeonato Paulista' },
    { id: 3, nome: 'Campeonato Carioca' }
  ];

  rankingTimes = [
    { posicao: 1, time: 'Time A', pontos: 45, percentual: '75%', jogos: 20, vitorias: 14, empates: 3, derrotas: 3, gp: 36, gc: 15, sg: 21 },
    { posicao: 2, time: 'Time B', pontos: 42, percentual: '70%', jogos: 20, vitorias: 13, empates: 3, derrotas: 4, gp: 34, gc: 18, sg: 16 },
    { posicao: 3, time: 'Time C', pontos: 39, percentual: '65%', jogos: 20, vitorias: 12, empates: 3, derrotas: 5, gp: 32, gc: 20, sg: 12 }
  ];

  rankingArtilheiros = [
    { posicao: 1, jogador: 'Jogador A', jogos: 20, media: 1.2, gols: 24 },
    { posicao: 2, jogador: 'Jogador B', jogos: 19, media: 1.1, gols: 21 },
    { posicao: 3, jogador: 'Jogador C', jogos: 18, media: 1.0, gols: 18 }
  ];

  rankingGoleiros = [
    { posicao: 1, jogador: 'Goleiro A', jogos: 20, gols_sofridos: 16 },
    { posicao: 2, jogador: 'Goleiro B', jogos: 19, gols_sofridos: 17 },
    { posicao: 3, jogador: 'Goleiro C', jogos: 18, gols_sofridos: 18 }
  ];

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  onCampeonatoChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if (selectedValue) {
      this.selectedCampeonato = this.campeonatos.find(c => c.id === +selectedValue);
    } else {
      this.selectedCampeonato = null;
    }
  }
}
