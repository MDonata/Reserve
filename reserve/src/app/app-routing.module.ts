import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ReservaComponent } from './views/reserva/reserva.component';
import { CadastroComponent } from './views/cadastro/cadastro.component';
import { PesquisaComponent } from './views/pesquisa/pesquisa.component';

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
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'pesquisa',
    component: PesquisaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
