import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Importando corretamente o routes

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)], // Usando o objeto routes exportado
}).catch((err) => console.error(err));
