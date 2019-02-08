import { Component, OnInit } from '@angular/core'
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog, MatDialogConfig,MatTableDataSource} from '@angular/material'

import { Vehiculos } from '../modelos/vehiculos.modelo';
import { Clientes } from '../modelos/clientes.modelo';
import { ClienteServicio } from '../servicios/cliente.servicio';

//SERVICIOS
import { VehiculoServicio } from '../servicios/vehiculo.servicio';
import { DataSource } from '@angular/cdk/table';


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
	
	after = 'after';
	public clienteEncontrado = false;
	

	displayedColumns = ['year', '1', '2', '3', '4', '5', '6'];
	dataSource = new MatTableDataSource();
	
	constructor(private dialog: MatDialog,private _vehiculoServicio:VehiculoServicio, private _clienteServicio: ClienteServicio, private _location: Location, private route: ActivatedRoute, private router: Router){
		this.vehiculo = new Vehiculos("","","",null,"","",null,null,false,false,false,[{anio:"", cuotas:[]}],false,false,false,false,false,false,false,false,false,false,false,"",true,null,{dni: null, nombre: "",apellido: "",celular: null, email: "",domicilio: "",_id: ""});
		this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
		//this.url = Ruta.url;
		this.route.params.subscribe( params => this.parmUrl= params['id']);
		//this.impAuto = [{ anio: '', cuotas: []}];
		this.imp = { anio: "", cuotas: [false,false,false,false,false,false]};
		
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
					
					this.dataSource = res.vehiculo.impParque;

					
					
				},
				err =>{
					console.log(err);
				}

			);
		},5);

	}


	altaVehiculo(){
		
		delete this.vehiculo._id;
		for(var i = 0; i<this.impues.length; i++){
			this.vehiculo.impParque[i].anio = this.impues[i].anio;
			this.vehiculo.impParque[i].cuotas = this.impues[i].cuotas; 
		}
		console.log(this.vehiculo);
		// if(this.vehiculo.impParque[0].anio = ""){
		// 	console.log("entra")
		// 	var index = this.vehiculo.impParque.indexOf(this.vehiculo.impParque[0],0);
		// 	if (index > -1) {
		// 	   this.vehiculo.impParque.splice(index, 1);
		// 	}	
		// 	console.log(this.vehiculo.impParque);
		// }

		if(this.clienteEncontrado){
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
			delete this.vehiculo.vendedor
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

	public impues = [];
	public imp: {
		anio: string,
		cuotas: any[]
	};
	public cuotas:["IMPAGO","IMPAGO","IMPAGO","IMPAGO","IMPAGO","IMPAGO"];
	public anio;
	guardarImp(){
		//prm.cuotas=[{valor: false}, {valor: false}, {valor: false}, {valor: false}, {valor: false}];
		// this.imp.cuotas = this.cuotas;
		//this.imp.anio = this.anio;
		// this.imp.cuotas = this.cuotas;
		for(var i=0; i < this.imp.cuotas.length; i++){
			if(this.	imp.cuotas[i] == false)
			{
				this.imp.cuotas[i] = "IMPAGO"
			}
			else
			{
				this.imp.cuotas[i]= "PAGADO"
			}
		}
		this.impues.push(this.imp);
		this.imp = { anio: null , cuotas: [false,false,false,false,false,false]};
		//this.vehiculo.impParque.push(this.imp);
		this.dataSource = new MatTableDataSource(this.impues);
		//this.impues.push(this.imp);
		console.log(this.dataSource);
		this.anio = null;
		this.cuotas = ["IMPAGO","IMPAGO","IMPAGO","IMPAGO","IMPAGO","IMPAGO"];
		
		}
	indexTracker(index: number, i: any) {
		return index;
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
export class Impuesto {
	year: number;
	cuotas: any[]
  }