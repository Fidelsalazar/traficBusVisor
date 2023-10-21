import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog'
import { ModalModule } from 'ngx-bootstrap/modal';
//Service
import { ApiService } from './services/api.service';
//Models
import { PositionsComponent } from './services/models/positions.component';
//Componet
import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { MapmodComponent } from './components/mapmod/mapmod.component';
import { Positions } from './services/models/positions';
import { NavbarComponent } from './components/assets/navbar/navbar.component';
import { RutmodComponent } from './components/rutmod/rutmod.component';
import { UsermodComponent } from './components/usermod/usermod.component';
import { SimpleformComponent } from './components/forms/simpleform/simpleform.component';
import { SimpleformModComponent } from './components/forms/simpleformmod/simpleformmod.component';
import { MapviewFuncionarioComponent } from './components/mapview-funcionario/mapview-funcionario.component';
import { SimleformpostComponent } from './components/forms/simleformpost/simleformpost.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PostComponent } from './components/post/post.component';
import { CheckmodalComponent } from './components/assets/checkmodal/checkmodal.component';
import { ErrormodalComponent } from './components/assets/errormodal/errormodal.component';
import { ModfuncsrouteComponent } from './components/modfuncsroute/modfuncsroute.component';


@NgModule({
  declarations: [
    AppComponent,
    PositionsComponent,
    NavbarComponent,
    MapmodComponent,
    routingComponents,
    RutmodComponent,
    UsermodComponent,
    SimpleformComponent,
    SimpleformModComponent,
    MapviewFuncionarioComponent,
    SimleformpostComponent,
    FilterPipe,
    PostComponent,
    CheckmodalComponent,
    ErrormodalComponent,
    ModfuncsrouteComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    MapComponent,
    ApiService,
    Positions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
