import { Component, OnInit } from '@angular/core'
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';
import {ActivatedRoute, Router} from "@angular/router";


import { Vehiculos } from '../modelos/vehiculos.modelo';

//SERVICIOS
import { VehiculoServicio } from '../servicios/vehiculo.servicio';


@Component ({
	selector: 'altaVehiculoComponente',
	templateUrl: '../vistas/altaVehiculo.html',
	providers: [VehiculoServicio]
})

export class altaVehiculoComponente implements OnInit{

	public HabilitarImpAuto;
	public impAuto = [];
	public vehiculo: Vehiculos;
	public parmUrl;

	constructor(private _vehiculoServicio:VehiculoServicio, private _location: Location, private route: ActivatedRoute, private router: Router){
		this.vehiculo = new Vehiculos("","","",null,"","",null,null,false,false,false,[{}],false,false,false,false,false,false,false,false,false,false,false,"",true,null);
		//this.url = Ruta.url;
		debugger;
		this.route.params.subscribe( params => this.parmUrl= params['id']);
		
	}

	ngOnInit(){
		setTimeout(()=>{

			this._vehiculoServicio.getVehiculo(this.parmUrl).subscribe(

			res=> {
				console.log(res)
				this.vehiculo = res.vehiculo;
				
			},
			err =>{
				console.log("No pasa nada");
			}

			);
		},10);

	}


	altaVehiculo(){
		debugger;
		delete this.vehiculo._id;
		this._vehiculoServicio.postVehiculos(this.vehiculo).subscribe(
			res => {
				alert("Vehiculo guardado");
				this._location.back();
				console.log("guardado", res);


			},
			err => {
				console.log("error", err);
			}
			);
	}

	guardarDetalleVehiculo(vehiculo){
		this._vehiculoServicio.putVehiculo(vehiculo).subscribe(
			res =>{
				alert("Vehiculo modificado");
				this.router.navigate(["/tablaVehiculos"]);
			},
			err => {
				alert("Error al actualizar. " + err);
				this._location.back();
			}
			)
	}


	Titulo = false;


	checked = false;
 	indeterminate = false;
	labelPosition = 'after';
	disabled = false;


}