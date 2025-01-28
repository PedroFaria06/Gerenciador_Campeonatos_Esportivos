import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Importação dos componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';
import { JogosComponent } from './jogos/jogos.component';
import { SumulaComponent } from './sumula/sumula.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { ClassificacaoComponent } from './classificacao/classificacao.component';
import { TeamsAndAthletesComponent } from './teams-and-athletes/teams-and-athletes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'teams-and-athletes', component: TeamsAndAthletesComponent },
  { path: 'campeonatos', component: CampeonatoComponent },
  { path: 'jogos', component: JogosComponent },
  { path: 'sumula', component: SumulaComponent },
  { path: 'relatorio', component: RelatorioComponent },
  { path: 'classificacao', component: ClassificacaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
