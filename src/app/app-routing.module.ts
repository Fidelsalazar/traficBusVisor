import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterOutlet } from '@angular/router';
//Components
import { RutmodComponent } from './components/rutmod/rutmod.component';
import { MapComponent } from './components/map/map.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MapviewFuncionarioComponent } from './components/mapview-funcionario/mapview-funcionario.component';
import { ModfuncsrouteComponent } from './components/modfuncsroute/modfuncsroute.component';

const routes:Routes=[
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'home', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path: 'mapfuncsview', component: MapviewFuncionarioComponent},
    {path:'mapmod', component: RutmodComponent},
    {path: 'mapview', component: MapComponent},
    {path: 'modroutes', component: ModfuncsrouteComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}
export const routingComponents = [
  LoginComponent,
  MapComponent,
  RutmodComponent,
  HomeComponent,
  MapviewFuncionarioComponent,
  ModfuncsrouteComponent
]
