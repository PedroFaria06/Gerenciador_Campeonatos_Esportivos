import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimesComponent } from './times/times.component';
import { CampeonatoComponent } from './campeonato/campeonato.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'times', component: TimesComponent },
  { path: 'campeonatos', component: CampeonatoComponent },
];
