import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Championship } from '../models/championship.interface';
import { Match } from '../models/match.interface';
import { ChampionshipTeamDTO } from '../models/championship-team.interface';
import { PageResponse } from '../models/page-response.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/api/v1`;

  constructor(private http: HttpClient) {}

  getChampionships(): Observable<PageResponse<Championship>> {
    return this.http.get<PageResponse<Championship>>(
      `${this.apiUrl}/championships`
    );
  }

  getMatches(championshipId: number): Observable<PageResponse<Match>> {
    return this.http.get<PageResponse<Match>>(
      `${this.apiUrl}/matches/championship/${championshipId}`
    );
  }

  getStandings(championshipId: number): Observable<ChampionshipTeamDTO[]> {
    return this.http.get<ChampionshipTeamDTO[]>(
      `${this.apiUrl}/championships/${championshipId}/standings`
    );
  }

  getDashboardData(championshipId: number): Observable<{
    matches: PageResponse<Match>;
    standings: ChampionshipTeamDTO[];
  }> {
    return forkJoin({
      matches: this.getMatches(championshipId),
      standings: this.getStandings(championshipId),
    });
  }
}
