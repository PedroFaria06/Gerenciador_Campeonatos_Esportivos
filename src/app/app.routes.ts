import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { TeamsAndAthletesComponent } from './teams-and-athletes/teams-and-athletes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'teams-and-athletes', component: TeamsAndAthletesComponent },
];
