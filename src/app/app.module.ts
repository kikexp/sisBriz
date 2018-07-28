import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';


//Clases de material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


//import {MatToolbarModule} from '@angular/material/toolbar';
//import { MatIconModule } from '@angular/material/icon';

//Componentes de la aplicación
import { AppComponent } from './app.component';
import { index } from './componentes/indexComponente';
import { barraSideComponente} from './componentes/barraSideComponente';
import { barraTopComponente } from './componentes/barraTopComponente';

import { tablaClientesComponente } from './componentes/tablaClientesComponente';
import { tablaVehiculosComponente } from './componentes/tablaVehiculosComponente';
import { altaClienteComponente } from './componentes/altaClienteComponente';
import { altaVehiculoComponente } from './componentes/altaVehiculoComponente';

import { tablaContratoComponente } from './componentes/tablaContratoComponente';
import { altaContratoComponente } from './componentes/altaContratoComponente';

import { tablaChequesComponente } from './componentes/tablaChequesComponente';
import { altaChequeComponente } from './componentes/altaChequeComponente';
import { loginComponente } from './componentes/loginComponente';


//Importamos los módulos de ruta
import { routing, appRoutingProviders } from './app.rutas';


@NgModule({
  declarations: [
    AppComponent,
    index,
    barraSideComponente,
    barraTopComponente,
    tablaClientesComponente,
    tablaVehiculosComponente,
    altaClienteComponente,
    altaVehiculoComponente,
    altaContratoComponente,
    altaChequeComponente,
    loginComponente,
    tablaChequesComponente,
    tablaContratoComponente
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
