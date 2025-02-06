import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Match } from '../models/match.interface';
import { PageResponse } from '../models/page-response.interface';
import { EnumDto } from '../models/enum-dto.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private apiUrl = `${environment.apiUrl}/api/v1/matches`;

  constructor(private http: HttpClient) {}

  getMatches(page = 0, size = 10): Observable<PageResponse<Match>> {
    return this.http.get<PageResponse<Match>>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getMatchesByChampionship(
    championshipId: number,
    page = 0,
    size = 10
  ): Observable<PageResponse<Match>> {
    return this.http.get<PageResponse<Match>>(
      `${this.apiUrl}/championship/${championshipId}?page=${page}&size=${size}`
    );
  }

  getMatchById(id: number): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/${id}`);
  }

  createMatch(match: Match): Observable<Match> {
    console.log(
      'Payload da criação de partida:',
      JSON.stringify(match, null, 2)
    );
    return this.http.post<Match>(this.apiUrl, match).pipe(
      catchError((error) => {
        console.error('Erro na criação de partida:', {
          status: error.status,
          message: error.error?.message,
          fullError: error,
        });
        return throwError(error);
      })
    );
  }

  updateMatch(id: number, match: Partial<Match>): Observable<Match> {
    return this.http.put<Match>(`${this.apiUrl}/${id}`, match);
  }

  deleteMatch(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMatchStatus(): Observable<EnumDto[]> {
    return this.http.get<EnumDto[]>(`${this.apiUrl}/status`);
  }
}
