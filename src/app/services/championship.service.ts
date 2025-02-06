import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Championship } from '../models/championship.interface';
import { PageResponse } from '../models/page-response.interface';
import { ChampionshipTeamDTO } from '../models/championship-team.interface';
import { EnumDto } from '../models/enum-dto.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class ChampionshipService {
  private apiUrl = `${environment.apiUrl}/api/v1/championships`;

  constructor(private http: HttpClient) {}

  getChampionships(
    page = 0,
    size = 10
  ): Observable<PageResponse<Championship>> {
    return this.http.get<PageResponse<Championship>>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getChampionshipById(id: number): Observable<Championship> {
    return this.http.get<Championship>(`${this.apiUrl}/${id}`);
  }

  addChampionship(championship: Championship): Observable<Championship> {
    return this.http.post<Championship>(this.apiUrl, championship);
  }

  updateChampionship(
    id: number,
    championship: Championship
  ): Observable<Championship> {
    console.log('Payload enviado:', JSON.stringify(championship));

    return this.http
      .put<Championship>(`${this.apiUrl}/${id}`, championship)
      .pipe(
        catchError((error) => {
          console.error('Erro detalhado:', error);
          return throwError(error);
        })
      );
  }

  deleteChampionship(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getChampionshipStandings(id: number): Observable<ChampionshipTeamDTO[]> {
    return this.http.get<ChampionshipTeamDTO[]>(
      `${this.apiUrl}/${id}/standings`
    );
  }

  getStatus(): Observable<EnumDto[]> {
    return this.http.get<EnumDto[]>(`${this.apiUrl}/status`);
  }

  addTeamsToChampionship(
    championshipId: number,
    teamIds: number[]
  ): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${championshipId}/teams`, {
      teamIds,
    });
  }
}
