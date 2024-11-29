import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  
  imports: [LoginComponent]  
})
export class AppComponent {
  title = 'Gerenciador Esportivo';
}
