import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importando o FormsModule

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule], // Incluindo FormsModule aqui
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmeSenha: string = '';

  onSubmit() {
    console.log('Formulário enviado:', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      confirmeSenha: this.confirmeSenha
    });
  }
}
