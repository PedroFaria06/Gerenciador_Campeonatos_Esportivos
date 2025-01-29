import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent {
  campeonatos = [
    {
      nome: 'Campeonato Estadual',
      status: 'Em andamento',
      local: 'São Paulo',
      data: '17/11/24 - 17/12/24',
      timesVisiveis: false,
      times: [
        { nome: 'Time 1' },
        { nome: 'Time 2' },
        { nome: 'Time 3' },
        { nome: 'Time 4' },
        { nome: 'Time 5' },
        { nome: 'Time 6' },
        { nome: 'Time 7' },
        { nome: 'Time 8' },
        { nome: 'Time 9' },
        { nome: 'Time 10' },
        { nome: 'Time 11' },
        { nome: 'Time 12' }
      ]
    },
    {
      nome: 'Copa Regional',
      status: 'Não Iniciado',
      local: 'Rio de Janeiro',
      data: '20/12/24 - 20/01/25',
      timesVisiveis: false,
      times: [
        { nome: 'Time 13' },
        { nome: 'Time 14' },
        { nome: 'Time 15' },
        { nome: 'Time 16' }
      ]
    }
  ];

  public toggleTimes(index: number) {
    this.campeonatos[index].timesVisiveis = !this.campeonatos[index].timesVisiveis;
  }

  public excluirTime(campeonato: any, time: any) {
    const index = campeonato.times.indexOf(time);
    if (index !== -1) {
      campeonato.times.splice(index, 1);
    }
  }
}

