import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimesComponent } from './times/times.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { JogosComponent } from './jogos/jogos.component';
import { SumulaComponent } from './sumula/sumula.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ClassificacaoComponent } from './classificacao/classificacao.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'times', component: TimesComponent },
  { path: 'campeonatos', component: CampeonatoComponent },
  { path: 'jogos', component: JogosComponent },
  { path: 'sumula', component: SumulaComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'classificacao', component: ClassificacaoComponent },
  { path: 'teams-and-athletes', component: TeamsAndAthletesComponent },
];
