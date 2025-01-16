import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true, // Certifique-se de que AppComponent é standalone
  imports: [LoginComponent], // Importa o LoginComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gerenciador de Campeonatos Esportivos';
}
