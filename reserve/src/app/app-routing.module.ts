import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { ReservaComponent } from './views/reserva/reserva.component';

// For menu child routes, pass the father's title as data
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'reserva',
    component: ReservaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
