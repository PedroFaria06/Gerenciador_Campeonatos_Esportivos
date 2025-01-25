import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css'],
})
export class CampeonatoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
