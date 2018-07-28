import { Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

//MODELOS
import { Contrato } from '../modelos/contrato.modelo';

//SERVICIOS
import { ContratoServicio } from '../servicios/contrato.servicio';

//RUTAS
import { Ruta } from '../rutaglobal';
import {Router} from '@angular/router';


@Component({
	selector: "tablaContratoComponente",
	templateUrl: "../vistas/tablaContratos.html",
	styleUrls: ["../styleTables/styleTables.css"],
	providers: [ContratoServicio]
	
})

export class tablaContratoComponente implements OnInit{

	public url: string;

	displayedColumns = ['indice','vehiculo', 'propietarios', 'fechaVenta','detalle'];

	dataSource: MatTableDataSource<Contrato>;
	

	constructor(private _contratoServicio: ContratoServicio, private router: Router){		
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		this._contratoServicio.getContratos().subscribe(
			res => {

				this.dataSource = new MatTableDataSource<Contrato>(res.mostrarContratos);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				console.log(this.dataSource);
				
			},
			err => {
				var msj = <any>err;
			})
		
	 }


	
	detalleCliente(contrato){
		this.router.navigate(['/detalleContrato/'+ contrato]);
	}

	applyFilter(filterValue: string) {
	    filterValue = filterValue.trim(); // Remove whitespace
	    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
	    this.dataSource.filter = filterValue;
	}
}