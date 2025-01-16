import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Componentes Standalone
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([]),
      // Não coloque o AppComponent aqui
      AppComponent, // Importando diretamente
      LoginComponent,
      CadastroComponent,
      DashboardComponent
    ]
    // Não há necessidade do AppComponent aqui
  })
  export class AppModule { }
  
