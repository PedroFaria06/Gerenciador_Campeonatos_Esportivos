import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Championship } from '../models/championship.interface';
import { Match } from '../models/match.interface';
import { ChampionshipTeamDTO } from '../models/championship-team.interface';
import { MatchEvent } from '../models/match-event.interface';
import { PageResponse } from '../models/page-response.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  private apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  getChampionships(): Observable<PageResponse<Championship>> {
    return this.http.get<PageResponse<Championship>>(
      `${this.apiUrl}/championships`
    );
  }

  getMatchesByChampionship(
    championshipId: number
  ): Observable<PageResponse<Match>> {
    return this.http.get<PageResponse<Match>>(
      `${this.apiUrl}/matches/championship/${championshipId}`
    );
  }

  getStandings(championshipId: number): Observable<ChampionshipTeamDTO[]> {
    return this.http.get<ChampionshipTeamDTO[]>(
      `${this.apiUrl}/championships/${championshipId}/standings`
    );
  }

  getMatchEvents(matchId: number): Observable<PageResponse<MatchEvent>> {
    return this.http.get<PageResponse<MatchEvent>>(
      `${this.apiUrl}/match-events/match/${matchId}`
    );
  }
}
