import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio',
  standalone: true, // Adicione esta linha para tornar o componente standalone
  imports: [CommonModule], // Adicione CommonModule aqui
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent {
  formVisible = false;

  toggleForm() {
    this.formVisible = !this.formVisible;
  }
}
