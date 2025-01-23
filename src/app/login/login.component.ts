import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  
  imports: [FormsModule]  
})
export class LoginComponent {
  email: string = '';  
  password: string = '';  

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);

    if (this.email === 'usuario@exemplo.com' && this.password === 'senha123') {
      console.log('Login bem-sucedido!');
    } else {
      console.log('Credenciais inválidas');
    }
  }
}
