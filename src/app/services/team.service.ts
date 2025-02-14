import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team.interface';
import { PageResponse } from '../models/page-response.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  private apiUrl = `${environment.apiUrl}/api/v1/teams`;

  constructor(private http: HttpClient) {}

  getTeams(page = 0, size = 100): Observable<PageResponse<Team>> {
    return this.http.get<PageResponse<Team>>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getTeamById(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.apiUrl}/${id}`);
  }

  addTeam(team: Team): Observable<Team> {
    console.log('Payload sendo enviado:', team);
    return this.http.post<Team>(this.apiUrl, team);
  }

  updateTeam(id: number, team: Team): Observable<Team> {
    return this.http.put<Team>(`${this.apiUrl}/${id}`, team);
  }

  deleteTeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
