import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CampeonatoService {
  private apiUrl = 'http://localhost:8080/api/v1/championships';

  constructor(private http: HttpClient) {}

  getCampeonatos() {
    return this.http.get<any>(this.apiUrl);
  }

  addCampeonato(campeonato: any) {
    return this.http.post(this.apiUrl, campeonato);
  }
}