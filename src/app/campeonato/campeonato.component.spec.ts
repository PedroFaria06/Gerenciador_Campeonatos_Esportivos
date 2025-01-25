import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando CommonModule para usar *ngFor

@Component({
  selector: 'app-campeonato',
  standalone: true, // Declarando o componente como standalone
  imports: [CommonModule], // Incluindo CommonModule para suportar *ngFor
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css'],
})
export class CampeonatoComponent implements OnInit {
  emAndamento = [
    { nome: 'Campeonato A' },
    { nome: 'Campeonato B' },
  ];

  proximosTorneios = [
    { nome: 'Campeonato C' },
    { nome: 'Campeonato D' },
  ];

  encerrados = [
    { nome: 'Campeonato E' },
    { nome: 'Campeonato F' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
