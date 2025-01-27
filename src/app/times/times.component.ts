import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-times',
  standalone: true, // Standalone está ativado
  imports: [CommonModule], // Adicione CommonModule aqui
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.css'],
})
export class TimesComponent implements OnInit {
  times: string[] = ['Time 1', 'Time 2', 'Time 3', 'Time 4', 'Time 5', 'Time 6', 'Time 7', 'Time 8', 'Time 9'];

  constructor() {}

  ngOnInit(): void {}
}
