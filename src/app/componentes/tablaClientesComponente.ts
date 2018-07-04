import { Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

//MODELOS
import { Clientes } from '../modelos/clientes.modelo';

//SERVICIOS
import { ClienteServicio } from '../servicios/cliente.servicio';

//RUTAS
import { Ruta } from '../rutaglobal';


@Component({
	selector: "tablaClientesComponente",
	templateUrl: "../vistas/tablaClientes.html",
	providers: [ClienteServicio]
	
})

export class tablaClientesComponente implements OnInit {
	//public listaClientes;
	public url: string;

	displayedColumns = ['nombre', 'apellido', 'dni'];

	dataSource: MatTableDataSource<Clientes>
	

	constructor(private _clienteServicio: ClienteServicio){		
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		this._clienteServicio.getClientes().subscribe(
			res => {

				this.dataSource = new MatTableDataSource<Clientes>(res.mostrarClientes);
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


	applyFilter(filterValue: string) {
		    filterValue = filterValue.trim(); // Remove whitespace
		    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		    this.dataSource.filter = filterValue;
		  }
	
}