import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Adicione esta linha
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,  // Apenas se o componente for standalone
  imports: [CommonModule]  // Adicione o CommonModule aqui
})
export class DashboardComponent implements OnInit {
  partidas: any[] = [];
  rankingTimes: any[] = [];
  rankingArtilheiros: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getPartidas().subscribe((data) => {
      this.partidas = data;
    });

    this.dashboardService.getRankingTimes().subscribe((data) => {
      this.rankingTimes = data;
    });

    this.dashboardService.getRankingArtilheiros().subscribe((data) => {
      this.rankingArtilheiros = data;
    });
  }
}
