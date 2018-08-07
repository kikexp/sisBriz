import { Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Location} from '@angular/common';

//MODELOS
import { Cheques } from '../modelos/cheque.modelo';

//SERVICIOS
import { ChequesServicio } from '../servicios/cheques.servicio';

//RUTAS
import { Ruta } from '../rutaglobal';
import {Router} from '@angular/router';


@Component({
	selector: "tablaCheques",
	templateUrl: "../vistas/tablaCheques.html",
	styleUrls: ["../styleTables/styleTables.css"],
	providers: [ChequesServicio]
	
})

export class tablaChequesComponente implements OnInit {

	public url: string;

	displayedColumns = ['indice','numero','entregador', 'monto', 'fechaentrega', 'detalle', 'eliminar'];

	dataSource: MatTableDataSource<Cheques>
	

	constructor(private _chequesServicio: ChequesServicio, private router: Router, private _location: Location){		
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;	

	ngOnInit() {
		
		this._chequesServicio.getCheques().subscribe(
			res => {
				console.log(res);

				this.dataSource = new MatTableDataSource<Cheques>(res.mostrarCheques);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				
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

	detalleCheque(cheque){
		this.router.navigate(['/detalleCliente/'+ cheque]);
	}

	eliminarCheque(cheque){
		if(confirm("Seguro desea eliminar?")){
			cheque.estado = false;
			this._chequesServicio.putCheque(cheque).subscribe(
			res=> {
				alert("Cheque eliminado");
				window.location.reload();
				console.log("guardado", res);

			}
			)
		}
		
	}

}