import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css'],
})
export class JogosComponent implements OnInit {
  campeonatos = [
    { id: 1, nome: 'Copa ABC' },
    { id: 2, nome: 'Campeonato Regional' },
    { id: 3, nome: 'Torneio Nacional' },
  ];

  selectedCampeonato: number | null = null;

  fases = [
    {
      nome: 'Etapa de Grupos',
      status: 'Concluído',
      grupos: [
        {
          nome: 'Grupo A',
          status: 'Concluído',
          expanded: false,
          jogos: [
            { time1: 'Time 1', time2: 'Time 2', data: '02/11/2024', local: 'Arena ABC', horario: '17:00' },
            { time1: 'Time 3', time2: 'Time 4', data: '02/11/2024', local: 'Arena ABC', horario: '19:00' },
            { time1: 'Time 1', time2: 'Time 3', data: '03/11/2024', local: 'Arena ABC', horario: '17:00' },
            { time1: 'Time 4', time2: 'Time 2', data: '03/11/2024', local: 'Arena ABC', horario: '19:00' },
          ],
        },
        {
          nome: 'Grupo B',
          status: 'Concluído',
          expanded: false,
          jogos: [
            { time1: 'Time 2', time2: 'Time 3', data: '04/11/2024', local: 'Arena ABC', horario: '17:00' },
            { time1: 'Time 1', time2: 'Time 4', data: '04/11/2024', local: 'Arena ABC', horario: '19:00' },
          ],
        },
      ],
    },
    {
      nome: 'Semi Final',
      status: 'Em andamento',
      grupos: [
        {
          nome: 'Semi Final 1',
          status: 'Em andamento',
          expanded: false,
          jogos: [{ time1: 'Time 1', time2: 'Time 2', data: '08/11/2024', local: 'Arena ABC', horario: '17:00' }],
        },
        {
          nome: 'Semi Final 2',
          status: 'Em andamento',
          expanded: false,
          jogos: [{ time1: 'Time 3', time2: 'Time 4', data: '09/11/2024', local: 'Arena ABC', horario: '17:00' }],
        },
      ],
    },
    {
      nome: 'Final',
      status: 'Não iniciado',
      grupos: [
        {
          nome: 'Final',
          status: 'Não iniciado',
          expanded: false,
          jogos: [{ time1: 'Time 1', time2: 'Time 3', data: '10/11/2024', local: 'Arena ABC', horario: '17:00' }],
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleGrupo(grupo: any) {
    grupo.expanded = !grupo.expanded;
  }
}
