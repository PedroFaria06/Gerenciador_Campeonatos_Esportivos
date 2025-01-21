import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importando CommonModule

// Componentes Standalone
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatorioComponent } from './relatorio/relatorio.component'; // Importando RelatorioComponent

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([]),
      CommonModule, // Adicionando CommonModule
      // Não coloque o AppComponent aqui
      AppComponent, // Importando diretamente
      LoginComponent,
      CadastroComponent,
      DashboardComponent,
      RelatorioComponent // Adicionando RelatorioComponent
    ],
    declarations: [ // Adicionando seção de declarações
      RelatorioComponent // Certifique-se de declarar o componente aqui
    ],
    // Não há necessidade do AppComponent aqui
  })
  export class AppModule { }
