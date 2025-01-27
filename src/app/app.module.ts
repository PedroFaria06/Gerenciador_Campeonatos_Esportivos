import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Componentes Standalone
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampeonatoComponent } from './campeonato/campeonato.component'; // Importando CampeonatoComponent

@NgModule({
    imports: [
      BrowserModule,
      RouterModule.forRoot([]),
      AppComponent, 
      LoginComponent,
      CadastroComponent,
      DashboardComponent,
      CampeonatoComponent 
    ]
})
export class AppModule { }
