import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpModule } from '@angular/http';
import localeEsAR from '@angular/common/locales/es-AR';

//Clases de material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';



//import {MatToolbarModule} from '@angular/material/toolbar';
//import { MatIconModule } from '@angular/material/icon';

//Componentes de la aplicación
import { AppComponent } from './app.component';
import { index } from './componentes/indexComponente';

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

//guards
import { LoginGuardGuard } from './servicios/guards/login-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { ImagenPipe } from './pipes/imagen.pipe';
import { MatDialogRef } from '@angular/material';
import { ImagenesComponentComponent } from './imagenes/imagenes-component/imagenes-component.component';

registerLocaleData(localeEsAR, 'es-Ar');
@NgModule({
  declarations: [
    AppComponent,
    index,
    tablaClientesComponente,
    tablaVehiculosComponente,
    altaClienteComponente,
    altaVehiculoComponente,
    altaContratoComponente,
    altaChequeComponente,
    loginComponente,
    tablaChequesComponente,
    tablaContratoComponente,
    ImagenPipe,
    ImagenesComponentComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [appRoutingProviders, { provide: LOCALE_ID, useValue: 'es-Ar' }, {provide: MatDialogRef}],
  bootstrap: [AppComponent],
  entryComponents: [altaChequeComponente, altaVehiculoComponente, altaClienteComponente]
})
export class AppModule { }
