import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/page-response.interface';
import { MatchEvent } from '../models/match-event.interface';
import { environment } from '../../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class MatchEventService {
  private apiUrl = `${environment.apiUrl}/api/v1/match-events`;

  constructor(private http: HttpClient) {}

  getMatchEvents(matchId: number): Observable<PageResponse<MatchEvent>> {
    return this.http.get<PageResponse<MatchEvent>>(
      `${this.apiUrl}/match/${matchId}`
    );
  }

  getMatchEventById(id: number): Observable<MatchEvent> {
    return this.http.get<MatchEvent>(`${this.apiUrl}/${id}`);
  }

  createMatchEvent(event: MatchEvent): Observable<MatchEvent> {
    return this.http.post<MatchEvent>(this.apiUrl, event);
  }

  deleteMatchEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
