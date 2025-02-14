import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player.interface';
import { PageResponse } from '../models/page-response.interface';
import { EnumDto } from '../models/enum-dto.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl = `${environment.apiUrl}/api/v1/players`;

  constructor(private http: HttpClient) {}

  getPlayers(page = 0, size = 1000): Observable<PageResponse<Player>> {
    return this.http.get<PageResponse<Player>>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getPlayerById(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.apiUrl}/${id}`);
  }

  getPlayersByTeam(
    teamId: number,
    page = 0,
    size = 1000
  ): Observable<PageResponse<Player>> {
    return this.http.get<PageResponse<Player>>(
      `${this.apiUrl}/team/${teamId}?page=${page}&size=${size}`
    );
  }

  getPositions(): Observable<EnumDto[]> {
    return this.http.get<EnumDto[]>(`${this.apiUrl}/positions`);
  }

  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.apiUrl, player);
  }

  updatePlayer(id: number, player: Player): Observable<Player> {
    return this.http.put<Player>(`${this.apiUrl}/${id}`, player);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
