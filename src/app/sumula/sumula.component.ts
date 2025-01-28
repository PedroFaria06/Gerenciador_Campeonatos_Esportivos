import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sumula',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importar FormsModule para [(ngModel)]
  templateUrl: './sumula.component.html',
  styleUrls: ['./sumula.component.css'],
})
export class SumulaComponent implements OnInit {
  campeonatos = [
    { id: 1, nome: 'Campeonato 1' },
    { id: 2, nome: 'Campeonato 2' },
    { id: 3, nome: 'Campeonato 3' },
  ];

  etapas = [
    { id: 1, nome: 'Etapa 1' },
    { id: 2, nome: 'Etapa 2' },
    { id: 3, nome: 'Etapa 3' },
  ];

  jogos = [
    { id: 1, nome: 'Jogo 1' },
    { id: 2, nome: 'Jogo 2' },
    { id: 3, nome: 'Jogo 3' },
  ];

  selectedCampeonato: number | null = null;
  selectedEtapa: number | null = null;
  selectedJogo: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
