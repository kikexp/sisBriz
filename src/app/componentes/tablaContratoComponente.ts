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

	displayedColumns = ['indice','vehiculo', 'propietarios', 'fechaVenta','detalle', 'eliminar'];

	public contratos;
	

	constructor(private _contratoServicio: ContratoServicio, private router: Router){		
	}

	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	ngOnInit() {
		
		this._contratoServicio.getContratos().subscribe(
			res => {

				this.contratos = new MatTableDataSource(res.mostrarContratos);
				this.contratos.paginator = this.paginator;
				this.contratos.sort = this.sort;
				console.log(this.contratos);
				
			},
			err => {
				var msj = <any>err;
			})
		
	 }


	
	detalleContrato(contrato){
		this.router.navigate(['/detalleContrato/'+ contrato]);
	}

	eliminarContrato(contrato){
		if(confirm("Seguro desea eliminar?")){
			contrato.estado = false;
			this._contratoServicio.putContrato(contrato).subscribe(
			res=> {
				alert("Cheque eliminado");
				window.location.reload();
				console.log("guardado", res);

			}
			)
		}
	}

	applyFilter(filterValue: string) {
	    filterValue = filterValue.trim(); // Remove whitespace
	    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
	    this.contratos.filter = filterValue;
	}
}