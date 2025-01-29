import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sumula',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sumula.component.html',
  styleUrls: ['./sumula.component.css'],
})
export class SumulaComponent implements OnInit {
  campeonatos = [{ id: 1, nome: 'Copa ABC' }];
  etapas = [{ id: 1, nome: 'Quartas de final' }];
  jogos = [{ id: 1, nome: 'Time 1 x Time 2' }];

  eventos = [
    { tipo: 'Cartão Amarelo', jogador: 'Pedro', numero: 10, tempo: 17, observacao: 'Primeiro cartão do jogo.' },
    { tipo: 'Gol', jogador: 'João', numero: 11, tempo: 23, observacao: 'Primeiro gol do jogo.' },
  ];

  time1 = [
    { numero: 1, nome: 'João Pedro', posicao: 'Goleiro' },
    { numero: 2, nome: 'Carlos', posicao: 'Defensor' },
  ];

  time2 = [
    { numero: 1, nome: 'João Pedro', posicao: 'Goleiro' },
    { numero: 2, nome: 'Lucas', posicao: 'Defensor' },
  ];

  selectedCampeonato: number | null = null;
  selectedEtapa: number | null = null;
  selectedJogo: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
