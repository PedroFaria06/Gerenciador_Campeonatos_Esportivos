import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar [(ngModel)]

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule], // Adicione CommonModule e FormsModule
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css'],
})
export class JogosComponent implements OnInit {
  campeonatos = [
    { id: 1, nome: 'Campeonato 1' },
    { id: 2, nome: 'Campeonato 2' },
    { id: 3, nome: 'Campeonato 3' },
  ];

  selectedCampeonato: number | null = null;

  constructor() {}

  ngOnInit(): void {}
}
