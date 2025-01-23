import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importar o RouterModule

@Component({
  selector: 'app-root',
  standalone: true,  // Definindo o componente como standalone
  imports: [RouterModule],  // Incluindo o RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gerenciador_Campeonatos_Esportivos';
}
