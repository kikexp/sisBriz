import { Component,OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';

//SERVICIOS
import { ContratoServicio } from '../servicios/contrato.servicio';

//RUTAS

import {Router} from '@angular/router';
import { altaChequeComponente } from './altaChequeComponente';
import { Contrato } from '../modelos/contrato.modelo';


@Component({
	selector: "tablaContratoComponente",
	templateUrl: "../vistas/tablaContratos.html",
	//styleUrls: ["../styleTables/styleTables.css"],
	providers: [ContratoServicio]
	
})

export class tablaContratoComponente implements OnInit{

	public url: string;

	displayedColumns = ['indice','vehiculo.modelo','vehiculo.marca', 'propietarios.nombre', 'propietarios.apellido', 'fechaIngreso','actions'];

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
				this.contratos.sortingDataAccessor = (item, property) => {
					switch(property) {
					  case 'vehiculo.modelo': return item.vehiculo.modelo;
					  case 'vehiculo.marca' : return item.vehiculo.marca;
					  case 'propietarios.apellido' : return item.propietarios[0].apellido;
					  case 'propietarios.nombre' : return item.propietarios[0].nombre;
					  default: return item[property];
					}
				  }
				this.contratos.sort = this.sort;
				this.contratos.filterPredicate = (order: Contrato, filter: string) => {
					const transformedFilter = filter.trim().toLowerCase();
				  
					const listAsFlatString = (obj): string => {
					  let returnVal = '';
				  
					  Object.values(obj).forEach((val) => {
						if (typeof val !== 'object') {
						  returnVal = returnVal + ' ' + val;
						} else if (val !== null) {
						  returnVal = returnVal + ' ' + listAsFlatString(val);
						}
					  });
				  
					  return returnVal.trim().toLowerCase();
					};
				  
					return listAsFlatString(order).includes(transformedFilter);
				  };
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
				alert("Venta eliminada ");
				this._contratoServicio.getContratos().subscribe(
					res => {
		
						this.contratos = new MatTableDataSource(res.mostrarContratos);
						this.contratos.paginator = this.paginator;
						this.contratos.sortingDataAccessor = (item, property) => {
							switch(property) {
							  case 'vehiculo.modelo': return item.vehiculo.modelo;
							  case 'vehiculo.marca' : return item.vehiculo.marca;
							  case 'propietarios.apellido' : return item.propietarios[0].apellido;
							  case 'propietarios.nombre' : return item.propietarios[0].nombre;
							  default: return item[property];
							}
						  }
						this.contratos.sort = this.sort;
						this.contratos.filterPredicate = (order: Contrato, filter: string) => {
							const transformedFilter = filter.trim().toLowerCase();
						  
							const listAsFlatString = (obj): string => {
							  let returnVal = '';
						  
							  Object.values(obj).forEach((val) => {
								if (typeof val !== 'object') {
								  returnVal = returnVal + ' ' + val;
								} else if (val !== null) {
								  returnVal = returnVal + ' ' + listAsFlatString(val);
								}
							  });
						  
							  return returnVal.trim().toLowerCase();
							};
						  
							return listAsFlatString(order).includes(transformedFilter);
						  };
						console.log(this.contratos);
						
					},
					err => {
						var msj = <any>err;
					})
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