import { Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

//MODELOS
import { Vehiculos } from '../modelos/vehiculos.modelo';

//SERVICIOS
import { VehiculoServicio } from '../servicios/vehiculo.servicio';

//RUTAS
import { Ruta } from '../rutaglobal';

@Component({
	selector: "tablaVehiculosComponente",
	templateUrl: "../vistas/tablaVehiculos.html",
	providers: [VehiculoServicio]
	
})

export class tablaVehiculosComponente implements OnInit{

	public url: string;

	displayedColumns = ['Marca', 'Modelo', 'Dominio', 'Numero de Chasis'];

	dataSource: MatTableDataSource<Vehiculos>
	

	constructor(private _vehiculoServicio: VehiculoServicio){		
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		this._vehiculoServicio.getVehiculos().subscribe(
			res => {

				this.dataSource = new MatTableDataSource<Vehiculos>(res.mostrarVehiculos);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				console.log(this.sort);
				console.log(this.dataSource);
				
				console.log(this.dataSource.sort)

				
			},
			err => {
				var msj = <any>err;
			})
		
	 }
}