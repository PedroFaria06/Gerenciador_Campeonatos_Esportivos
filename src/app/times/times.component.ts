import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-times',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css']
})
export class TimesComponent {
  times = [
    { nome: 'Time 1', jogadoresVisiveis: false },
    { nome: 'Time 2', jogadoresVisiveis: false },
    { nome: 'Time 3', jogadoresVisiveis: false },
    { nome: 'Time 4', jogadoresVisiveis: false },
    { nome: 'Time 5', jogadoresVisiveis: false }
  ];


  jogadoresPorTime: Record<string, { numero: number; nome: string; posicao: string; altura: string }[]> = {
    "Time 1": [
      { numero: 1, nome: 'Pedro Silva', posicao: 'Goleiro', altura: '1.95' },
      { numero: 5, nome: 'Lucas Oliveira', posicao: 'Zagueiro', altura: '1.88' },
      { numero: 10, nome: 'Felipe Souza', posicao: 'Meia', altura: '1.78' },
      { numero: 9, nome: 'Carlos Santos', posicao: 'Atacante', altura: '1.82' }
    ],
    "Time 2": [
      { numero: 2, nome: 'André Costa', posicao: 'Goleiro', altura: '1.93' },
      { numero: 6, nome: 'Thiago Mendes', posicao: 'Zagueiro', altura: '1.85' },
      { numero: 8, nome: 'Rafael Silva', posicao: 'Meia', altura: '1.79' },
      { numero: 11, nome: 'Bruno Lima', posicao: 'Atacante', altura: '1.84' }
    ],
    "Time 3": [
      { numero: 3, nome: 'Eduardo Rocha', posicao: 'Goleiro', altura: '1.94' },
      { numero: 7, nome: 'Gustavo Almeida', posicao: 'Zagueiro', altura: '1.87' },
      { numero: 4, nome: 'Henrique Duarte', posicao: 'Meia', altura: '1.80' },
      { numero: 12, nome: 'Vitor Ferreira', posicao: 'Atacante', altura: '1.83' }
    ],
    "Time 4": [
      { numero: 13, nome: 'Marcelo Nunes', posicao: 'Goleiro', altura: '1.96' },
      { numero: 14, nome: 'Rodrigo Martins', posicao: 'Zagueiro', altura: '1.89' },
      { numero: 15, nome: 'Matheus Lopes', posicao: 'Meia', altura: '1.81' },
      { numero: 16, nome: 'João Batista', posicao: 'Atacante', altura: '1.85' }
    ],
    "Time 5": [
      { numero: 17, nome: 'Fábio Ribeiro', posicao: 'Goleiro', altura: '1.97' },
      { numero: 18, nome: 'Renato Mendes', posicao: 'Zagueiro', altura: '1.86' },
      { numero: 19, nome: 'Diego Farias', posicao: 'Meia', altura: '1.76' },
      { numero: 20, nome: 'Leonardo Vieira', posicao: 'Atacante', altura: '1.80' }
    ]
  };

  toggleJogadores(index: number) {
    this.times[index].jogadoresVisiveis = !this.times[index].jogadoresVisiveis;
  }
}
