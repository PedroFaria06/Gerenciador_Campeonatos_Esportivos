import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor() {}

  // Simula a obtenção de partidas
  getPartidas(): Observable<any[]> {
    const partidas = [
      { data: '02/11/2024 | 14:00', time1: 'TIME 1', time2: 'TIME 2', status: 'Em andamento' },
      { data: '15/11/2024 | 17:00', time1: 'TIME 1', time2: 'TIME 2', status: 'Próxima' },
    ];
    return of(partidas);
  }

  // Simula a atualização periódica de rankings
  getRankingTimes(): Observable<any[]> {
    return interval(5000).pipe(
      map(() => [
        { posicao: 1, time: 'Time A', pontos: 48 },
        { posicao: 2, time: 'Time B', pontos: 44 },
        { posicao: 3, time: 'Time C', pontos: 42 },
      ])
    );
  }

  // Simula a obtenção do ranking de artilheiros
  getRankingArtilheiros(): Observable<any[]> {
    return of([
      { posicao: 1, jogador: 'Jogador 1', jogos: 48, media: 0.67, gols: 32 },
      { posicao: 2, jogador: 'Jogador 2', jogos: 47, media: 0.62, gols: 29 },
    ]);
  }
}
