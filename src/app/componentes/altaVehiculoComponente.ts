import { Component, OnInit } from '@angular/core'
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';
import {ActivatedRoute, Router} from "@angular/router";


import { Vehiculos } from '../modelos/vehiculos.modelo';
import { Clientes } from '../modelos/clientes.modelo';
import { ClienteServicio } from '../servicios/cliente.servicio';

//SERVICIOS
import { VehiculoServicio } from '../servicios/vehiculo.servicio';


@Component ({
	selector: 'altaVehiculoComponente',
	templateUrl: '../vistas/altaVehiculo.html',
	providers: [VehiculoServicio,ClienteServicio]
})

export class altaVehiculoComponente implements OnInit{

	public HabilitarImpAuto;
	public cliente: Clientes;
	public banderaCliente = false;
	public mensajeC;
	//public impAuto: [{ anio: string, cuotas: any[]}];
	public vehiculo: Vehiculos;
	public parmUrl;
	public impues;
	public imp: {
		anio: string,
		cuotas: any[]
	};
	after = 'after';

	constructor(private _vehiculoServicio:VehiculoServicio, private _clienteServicio: ClienteServicio, private _location: Location, private route: ActivatedRoute, private router: Router){
		this.vehiculo = new Vehiculos("","","",null,"","",null,null,false,false,false,[{anio:"", cuotas:[]}],false,false,false,false,false,false,false,false,false,false,false,"",true,null,{dni:null,nombre:"",apellido:"", celular:null, email:"", domicilio:""});
		this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
		//this.url = Ruta.url;
		this.route.params.subscribe( params => this.parmUrl= params['id']);
		//this.impAuto = [{ anio: '', cuotas: []}];
		this.imp = { anio: "", cuotas: []}
		
	}

	ngOnInit(){
		setTimeout(()=>{

			this._vehiculoServicio.getVehiculo(this.parmUrl).subscribe(

			res=> {
				
				this.vehiculo = res.vehiculo;
				

				//this.impAuto = this.vehiculo.impParque;
				
			},
			err =>{
				console.log(err);
			}

			);
		},10);

	}


	altaVehiculo(){
		
		delete this.vehiculo._id;
		//this.vehiculo.impParque = this.impAuto;
		this._vehiculoServicio.postVehiculos(this.vehiculo).subscribe(
			res => {
				alert("Vehiculo guardado");
				this._location.back();
				


			},
			err => {
				console.log("error", err);
			}
			);
	}

	guardarDetalleVehiculo(vehiculo){
		//this.vehiculo.impParque = this.impAuto;
		//this.vehiculo.vendedor = this.cliente._id;
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

	guardarImp(prm){
		//prm.cuotas=[{valor: false}, {valor: false}, {valor: false}, {valor: false}, {valor: false}];
		console.log(this.vehiculo.impParque);	
		this.vehiculo.impParque.push(prm)
		console.log(this.vehiculo.impParque);
		
	}
	eliminarImp(){
		//prm.cuotas=[{valor: false}, {valor: false}, {valor: false}, {valor: false}, {valor: false}];
		console.log(this.vehiculo.impParque);
		var index = this.vehiculo.impParque.indexOf(this.impues, 0);
		if (index > -1) {
		   this.vehiculo.impParque.splice(index, 1);
		}	
		this.impues = null;
		console.log(this.vehiculo.impParque);
		
	}

	buscarCliente (clientePrm){
		//console.log("entra");
		this.mensajeC = null;
		this._clienteServicio.getCliente(clientePrm).subscribe(

			res=> {
				console.log(res)
				this.vehiculo.vendedor = res.cliente;
				this.banderaCliente = true

			},
			err =>{
				console.log(err);
				this.mensajeC = JSON.parse(err._body).mensaje;
				this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
			}

			);
	}


	Titulo = false;


	checked = false;
 	indeterminate = false;
	labelPosition = 'after';
	disabled = false;


}