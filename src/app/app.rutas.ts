//Es una envoltura alrededor de un módulo que incluye también los proveedores.
import { ModuleWithProviders } from '@angular/core';

// El router angular es un servicio opcional que presenta una vista de componente particular para una determinada URL. No es parte del núcleo angular. Es en su propio paquete de biblioteca, @angular/router.lo que necesita de ella.
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { index } from './componentes/indexComponente'
import { tablaClientesComponente } from './componentes/tablaClientesComponente';
import { tablaVehiculosComponente } from './componentes/tablaVehiculosComponente';
import { altaClienteComponente } from './componentes/altaClienteComponente';
import { altaVehiculoComponente } from './componentes/altaVehiculoComponente';

import { tablaContratoComponente } from './componentes/tablaContratoComponente';
import { altaContratoComponente } from './componentes/altaContratoComponente';


import { tablaChequesComponente } from './componentes/tablaChequesComponente';
import { altaChequeComponente } from './componentes/altaChequeComponente';


const appRoutes: Routes = [

	{ path: '', component: tablaClientesComponente},
	{ path: "tablaClientes", component: tablaClientesComponente},
	{ path: "altaCliente", component: altaClienteComponente},
	{ path: "detalleCliente/:id", component: altaClienteComponente},

	{ path: "tablaVehiculos", component: tablaVehiculosComponente},
	{ path: "altaVehiculo", component: altaVehiculoComponente},
	{ path: "detalleVehiculo/:id", component: altaVehiculoComponente},
	
	{ path: "tablaContratos", component: tablaContratoComponente},
	{ path: "altaContrato", component: altaContratoComponente},

	{ path: "tablaCheques", component: tablaChequesComponente},
	{ path: "altaCheque", component: altaChequeComponente}
	
]

// Exportamos una variable constante llamada appRoutingProviders que va a ser un Array con objeto de cualquier tipo
export const appRoutingProviders: any[] = [];
// Exportamos otra variable constante llamada routing de tipo ModuleWithProviders con el valor del objeto RouterModule utilizando el método forRoot con el parámetro de la ruta que nosotros indicamos en el appRoutes
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);	