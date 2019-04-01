import { Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';

//MODELOS
import { Vehiculos } from '../modelos/vehiculos.modelo';

//SERVICIOS
import { VehiculoServicio } from '../servicios/vehiculo.servicio';

//RUTAS
import {Router} from '@angular/router';
import { altaVehiculoComponente } from './altaVehiculoComponente';

@Component({
	selector: "tablaVehiculosComponente",
	templateUrl: "../vistas/tablaVehiculos.html",
	styleUrls: ["../styleTables/styleTables.css"],
	providers: [VehiculoServicio]
	
})

export class tablaVehiculosComponente implements OnInit{

	public url: string;

	displayedColumns = ['indice','marca', 'modelo', 'dominio', 'numeroChasis', 'year', 'precioVenta', 'actions'];

	dataSource: MatTableDataSource<Vehiculos>
	

	constructor(private dialog: MatDialog,private _vehiculoServicio: VehiculoServicio, private router: Router){		
	}
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		this._vehiculoServicio.getVehiculos().subscribe(
			res => {

				console.log(res);

				this.dataSource = new MatTableDataSource<Vehiculos>(res.mostrarVehiculos);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;

			},
			err => {
				var msj = <any>err;
			});
	 }

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	eliminarVehiculo(vehiculo){
		if(confirm("Seguro desea eliminar?")){
			vehiculo.estado = false;
			console.log(vehiculo)
			this._vehiculoServicio.putVehiculo(vehiculo).subscribe(
			res=> {
				console.log(res)
				alert("Vehiculo eliminado");
				window.location.reload();
				console.log("guardado", res);

			}
			)
		}
	}

	detalleVehiculo(vehiculo){
		this.router.navigate(['/detalleVehiculo/'+ vehiculo]);
	}

	nuevoVehiculo(){
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.width = "60%";
		const dialogRef =  this.dialog.open(altaVehiculoComponente, dialogConfig);
		dialogRef.afterClosed().subscribe(result => {
			this._vehiculoServicio.getVehiculos().subscribe(
				res => {
					console.log(res);

					this.dataSource = new MatTableDataSource<Vehiculos>(res.mostrarVehiculos);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;

				},
				err => {
					var msj = <any>err;
				})
		})
	}
}