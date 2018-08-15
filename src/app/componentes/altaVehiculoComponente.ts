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
	public impAuto: [{}];
	public vehiculo: Vehiculos;
	public parmUrl;
	public imp = {
		anio: '',
		cuotas: [{valor: false}, {valor: false}, {valor: false}, {valor: false}, {valor: false}]
	}
	after = 'after';

	constructor(private _vehiculoServicio:VehiculoServicio, private _clienteServicio: ClienteServicio, private _location: Location, private route: ActivatedRoute, private router: Router){
		this.vehiculo = new Vehiculos("","","",null,"","",null,null,false,false,false,[{}],false,false,false,false,false,false,false,false,false,false,false,"",true,null,"");
		this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
		//this.url = Ruta.url;
		this.route.params.subscribe( params => this.parmUrl= params['id']);
		//this.impAuto = [{}];
		
	}

	ngOnInit(){
		setTimeout(()=>{

			this._vehiculoServicio.getVehiculo(this.parmUrl).subscribe(

			res=> {
				
				this.vehiculo = res.vehiculo;
				this._clienteServicio.getCliente(this.vehiculo.vendedor).subscribe(

					res=> {
						console.log(res)
						this.cliente = res.cliente;
						this.banderaCliente = true

					},
					err =>{
						console.log(err);
						this.mensajeC = JSON.parse(err._body).mensaje;
						this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
					}

				);

				this.impAuto = this.vehiculo.impParque;
				
			},
			err =>{
				console.log(err);
			}

			);
		},10);

	}


	altaVehiculo(){
		
		delete this.vehiculo._id;
		this.vehiculo.impParque = this.impAuto;
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
		this.vehiculo.impParque = this.impAuto;
		this.vehiculo.vendedor = this.cliente._id;
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
		prm.cuotas=[{valor: false}, {valor: false}, {valor: false}, {valor: false}, {valor: false}];
		console.log(this.impAuto);	
		this.impAuto.push(prm);
		console.log(this.impAuto);
		this.imp = {
			anio: '',
			cuotas: [{valor: false}, {valor: false}, {valor: false}, {valor: false}, {valor: false}]
		}	
	}

	buscarCliente (clientePrm){
		//console.log("entra");
		this.mensajeC = null;
		this._clienteServicio.getCliente(clientePrm).subscribe(

			res=> {
				console.log(res)
				this.cliente = res.cliente;
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