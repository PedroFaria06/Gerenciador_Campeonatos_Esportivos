import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  formVisible = false;

  campeonatos = [
    { id: 0, nome: 'Todos' },
    { id: 1, nome: 'Campeonato Brasileiro' },
    { id: 2, nome: 'Campeonato Paulista' },
    { id: 3, nome: 'Campeonato Carioca' }
  ];

  etapas = [
    { id: 0, nome: 'Todos' },
    { id: 1, nome: 'Primeira Fase' },
    { id: 2, nome: 'Segunda Fase' },
    { id: 3, nome: 'Final' }
  ];

  jogos = [
    { id: 0, nome: 'Todos' },
    { id: 1, nome: 'Jogo 1' },
    { id: 2, nome: 'Jogo 2' },
    { id: 3, nome: 'Jogo 3' }
  ];

  toggleForm() {
    this.formVisible = !this.formVisible;
  }
}
