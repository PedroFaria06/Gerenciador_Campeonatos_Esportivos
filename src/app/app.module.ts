import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginComponent,
    CadastroComponent
  ],
  providers: [],
})
export class AppModule { }
