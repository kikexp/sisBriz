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
	public clienteEncontrado = false;

	constructor(private _vehiculoServicio:VehiculoServicio, private _clienteServicio: ClienteServicio, private _location: Location, private route: ActivatedRoute, private router: Router){
		this.vehiculo = new Vehiculos("","","",null,"","",null,null,false,false,false,[{anio:"", cuotas:[]}],false,false,false,false,false,false,false,false,false,false,false,"",true,null,{dni: null, nombre: "",apellido: "",celular: null, email: "",domicilio: "",_id: ""});
		this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
		//this.url = Ruta.url;
		this.route.params.subscribe( params => this.parmUrl= params['id']);
		//this.impAuto = [{ anio: '', cuotas: []}];
		this.imp = { anio: "", cuotas: []}
		
	}

	ngOnInit(){
		setTimeout(()=>{
			this.vehiculo.vendedor = {_id:"",dni: null ,nombre:"",apellido:"", celular: null, email:"", domicilio:""};
			this.banderaCliente = false;
			this._vehiculoServicio.getVehiculo(this.parmUrl).subscribe(

				res=> {
					console.log(res)
					this.vehiculo = res.vehiculo;
					if(!this.vehiculo.vendedor){
						console.log("entra");
						this.vehiculo.vendedor = {
							dni: null,
							nombre: "",
							apellido: "",
							domicilio: "",
							email: "",
							celular: null,
							_id: ""
						}
					}else{
						this.clienteEncontrado = true;

					}
					if(res.vehiculo.impParque = [null]){
						console.log("entra a impuesto")
						this.vehiculo.impParque = [
						 {
						 	anio: null,
						 	cuotas: []
						 }
						]
					}

					
					
				},
				err =>{
					console.log(err);
				}

			);
		},5);

	}


	altaVehiculo(){
		
		delete this.vehiculo._id;
		console.log(this.vehiculo);
		if(this.vehiculo.impParque[0].anio = ""){
			console.log("entra")
			var index = this.vehiculo.impParque.indexOf(this.vehiculo.impParque[0],0);
			if (index > -1) {
			   this.vehiculo.impParque.splice(index, 1);
			}	
			console.log(this.vehiculo.impParque);
		}

		if(!this.clienteEncontrado){
			console.log("entra a cliente nuevo")
			this._clienteServicio.postCliente(this.vehiculo.vendedor).subscribe(
				resp => {
					console.log(resp);

					this.vehiculo.vendedor = resp.clienteGuardado;

					this._vehiculoServicio.postVehiculos(this.vehiculo).subscribe(
						res => {
							console.log(res.mensaje)
							alert(res.mensaje);
							if(res.mensaje = "vehiculo existente"){
								window.location.reload();
							}
							this._location.back();
							


						},
						err => {
							console.log("error", err);
						}
					);
				}
				)
			
		}else{

			this._vehiculoServicio.postVehiculos(this.vehiculo).subscribe(
			res => {
				console.log(res.mensaje)
				alert(res.mensaje);
				if(res.mensaje = "vehiculo existente"){
					window.location.reload();
				}else{

					this._location.back();								
				}
				
				
				


			},
			err => {
				console.log("error", err);
			}
			);
		}

		
	}

	guardarDetalleVehiculo(vehiculo){
		console.log(vehiculo);
		console.log(vehiculo.vendedor)
		if(vehiculo.vendedor.dni == null){
			delete vehiculo.vendedor
			console.log(vehiculo)
		}
		this._vehiculoServicio.putVehiculo(vehiculo).subscribe(
			res =>{
				alert("Vehiculo modificado");
				window.location.reload();
			},
			err => {
				alert("Error al actualizar. " + err);
				this._location.back();
			})
		
		
			
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
		this.clienteEncontrado = false;
		this._clienteServicio.getCliente(clientePrm).subscribe(

			res=> {
				this.clienteEncontrado =true
				console.log(res)
				this.vehiculo.vendedor._id = res.cliente._id;
				this.vehiculo.vendedor.dni = res.cliente.dni;
				this.vehiculo.vendedor.nombre = res.cliente.nombre;
				this.vehiculo.vendedor.apellido = res.cliente.apellido;
				
				this.vehiculo.vendedor.domicilio = res.cliente.domicilio;
				this.vehiculo.vendedor.email = res.cliente.email;

			},
			err =>{
				console.log(err);
				this.mensajeC = JSON.parse(err._body).mensaje;
				//this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
			}

			);
		if(!this.clienteEncontrado){
			this.vehiculo.vendedor = {_id: "",dni: null, nombre: "",apellido: "",celular: null, email: "",domicilio: ""}
		}
	}


	Titulo = false;


	checked = false;
 	indeterminate = false;
	labelPosition = 'after';
	disabled = false;


}