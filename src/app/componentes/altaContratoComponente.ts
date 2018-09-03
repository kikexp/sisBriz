import { Component, OnInit } from '@angular/core'
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';
import {ActivatedRoute, Router} from "@angular/router";


import { Contrato } from '../modelos/contrato.modelo';
import { Clientes } from '../modelos/clientes.modelo';
import { Vehiculos } from '../modelos/vehiculos.modelo';

//SERVICIOS
import { ContratoServicio } from '../servicios/contrato.servicio';
import { ClienteServicio } from '../servicios/cliente.servicio';
import { VehiculoServicio } from '../servicios/vehiculo.servicio';

@Component({
	selector: "altaContratoComponente",
	templateUrl: "../vistas/altaContrato.html",
	providers: [ContratoServicio, ClienteServicio, VehiculoServicio]

})

export class altaContratoComponente {
	public hConyuge = false;
	public contrato: Contrato;
	public cliente: Clientes;
	public conyuge: Clientes;
	public vehiculo: Vehiculos;
	public usado: Vehiculos;
	public Usado = false;	
	public banderaCliente = false;
	public banderaUsado = false;
	public banderaConyuge = false;
	public mensajeC;
	public mensajeV;
	public mensajeCon;
	public parmUrl;
	public Sena = false;
	public Contado = false;
	public Finan = false;
	public vehiculoBuscar = "";
	constructor(private _vehiculoServicio:VehiculoServicio,private _location: Location,private _clienteServicio: ClienteServicio, private _contratoServicio: ContratoServicio
		,private route: ActivatedRoute, private router: Router){
		this.route.params.subscribe( params => this.parmUrl= params['id']);
		this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","");
		this.conyuge = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","")
		this.vehiculo = new Vehiculos("","","",null,"","",null,null,false,false,false,[{anio:"", cuotas:[]}],false,false,false,false,false,false,false,false,false,false,false,"",true,null,{_id: "",dni: null, nombre: "",apellido: "",celular: null, email: "",domicilio: ""});
		this.usado = new Vehiculos("","","",null,"","",null,null,false,false,false,[{anio:"", cuotas:[]}],false,false,false,false,false,false,false,false,false,false,false,"",true,null,{_id: "",dni: null, nombre: "",apellido: "",celular: null, email: "",domicilio: ""});
		this.contrato = new Contrato("",null, "",[""], null, null, null, null,"",null,null, "","");
		
	}

	ngOnInit(){
		setTimeout(()=>{
			//this.vehiculo.vendedor = {dni: 123 ,nombre:"",apellido:"", celular: 123, email:"", domicilio:""};
			console.log(this.parmUrl);
			this._contratoServicio.getContrato(this.parmUrl).subscribe(
				res =>{

					console.log(res)
					if(res.Contrato.propietarios[0] && res.Contrato.propietarios[1]){
						this.contrato = res.Contrato;
						this.vehiculo = res.Contrato.vehiculo;
						this.cliente = res.Contrato.propietarios[0];
						this.conyuge = res.Contrato.propietarios[1];
						this.usado = res.Contrato.usado;
						this.hConyuge = true;
					}
					else{
						if(res.Contrato.propietarios[0]){
							this.contrato = res.Contrato;
							this.vehiculo = res.Contrato.vehiculo;
							this.usado = res.Contrato.usado;
							this.cliente = res.Contrato.propietarios[0];
						}
					}
					if(this.usado){
						this.Usado = true;
					}
					if(this.contrato.sena){
						this.Sena = true;
					}
					if(this.contrato.montoFinanc && this.contrato.adicional){
						this.Finan = true;
					}
					if(this.contrato.contado){
						this.Contado = true;
					}
				}

				)
		},5);

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

	buscarConyuge(conyugePrm){
		this.mensajeCon = null;
		this._clienteServicio.getCliente(conyugePrm).subscribe(
			res => {
				this.conyuge = res.cliente;
				//this.banderaConyuge = true;
			},
			err =>{
				this.mensajeCon = JSON.parse(err._body).mensaje;
				console.log(err._body);
			}
			);
	}

	buscarVehiculo (vehiculoPrm){
		this.mensajeV = null;
		//console.log("entra");
		this._vehiculoServicio.getVehiculo(vehiculoPrm).subscribe(

			res=> {
				console.log(res.vehiculo);
				Object.assign(this.vehiculo, res.vehiculo)
				/*this.vehiculo._id = res.vehiculo._id;
				this.vehiculo.precioVenta = res.vehiculo.precioVenta;
				this.vehiculo.modelo = res.vehiculo.modelo;
				this.vehiculo.marca = res.vehiculo.marca
				this.vehiculo.precioCompra = res.vehiculo.precioCompra;*/
				console.log(this.vehiculo)			
				
			},
			err =>{
				console.log(err);
				this.mensajeV = JSON.parse(err._body).mensaje;
			}

			);
	}

	

	altaContrato(){
		console.log("entra a guardar contrato")
		//let arrayC = [];
		delete this.contrato._id;
		this.contrato.propietarios.pop();
		let idUsado;
		console.log(this.banderaCliente);
		console.log(this.banderaConyuge);
		if(this.banderaCliente){
			this.contrato.propietarios.push(this.cliente._id);
			//this.vehiculo.vendedor = this.cliente._id;
			if(this.hConyuge && this.banderaConyuge){
				this.contrato.propietarios.push(this.conyuge._id);
			}
			else{
				if(this.hConyuge && !this.banderaConyuge){
					
					delete this.conyuge._id;
					this._clienteServicio.postCliente(this.conyuge).subscribe(
						res => {						
							console.log("conyuge guardado");
							this.contrato.propietarios.push(res.clienteGuardado._id);
							//this.vehiculo.vendedor = res.cliente._id;
						},
						err => {
							console.log("error", err);
						}
						);
				}
			}
		}
		else{
			
			delete this.cliente._id;
			this._clienteServicio.postCliente(this.cliente).subscribe(
				res => {				
					console.log("cliente guardado", res);

					this.contrato.propietarios.push(res.clienteGuardado._id);
					this.vehiculo.vendedor = res.clienteGuardado._id;
					
				},
				err => {
					console.log("error", err);
				}
				);
			if(this.hConyuge && this.banderaConyuge){
				this.contrato.propietarios.push(this.conyuge._id);
			}
			else{
				if(this.hConyuge && !this.banderaConyuge){
					
					delete this.conyuge._id;
					this._clienteServicio.postCliente(this.conyuge).subscribe(
						resp => {						
							console.log("conyuge guardado",resp);
							this.contrato.propietarios.push(resp.clienteGuardado._id);

						},
						err => {
							console.log("error", err);
						}
						);
				}
			}

		}

		console.log("array de propietarios", this.contrato.propietarios)
		if(this.Usado){
			delete this.usado._id;
			console.log(this.usado);
			this.usado.vendedor = this.cliente;
			
			this._vehiculoServicio.postVehiculos(this.usado).subscribe(
				res => {
					console.log("usado guardado", res);
					idUsado = res.vehiculoGuardado._id;
					this.vehiculo.estado = false;
					delete this.vehiculo.vendedor;
					this._vehiculoServicio.putVehiculo(this.vehiculo).subscribe(
						res =>{
							console.log("vehiculo dado de baja",res);
							this.contrato.vehiculo = this.vehiculo._id;
							this.contrato.usado = idUsado;
							this._contratoServicio.postContrato(this.contrato).subscribe(
								res =>{
									console.log("contrato guardado");
									alert("Venta realizada");
									this._location.back();
								},
								err => {
									console.log("error al guardar contrato")
								}
								)

							
						},
						err => {
							console.log("error al dar de baja el vehiculo",err);
						}
					)
				},
				err => {
					console.log("eror en usado", err)
				}
				)
		}
		else{
			this.vehiculo.estado = false;
			
			this._vehiculoServicio.putVehiculo(this.vehiculo).subscribe(
				res =>{
					console.log("vehiculo dado de baja",res);
					
					this.contrato.vehiculo = this.vehiculo._id;
					delete this.contrato.usado;
					this._contratoServicio.postContrato(this.contrato).subscribe(
						res =>{
							console.log("contrato guardado");
							alert("Venta realizada");
							this._location.back();
						},
						err => {
							console.log("error al guardar contrato")
						}
						)
					
				},
				err => {
					console.log("error al dar de baja el vehiculo",err);
				}
			)
		}



	}

	guardarDetalleContrato(contrato){		
		console.log(contrato);
		contrato.vehiculo =this.vehiculo;
		if(this.usado){
			contrato.usado = this.usado._id;
		}
		if(this.cliente){
			contrato.propietarios[0] = this.cliente;
		}
		if(this.conyuge._id != "")
		{
			console.log("entra aqui")
			contrato.propietarios[1] = this.conyuge;
		}
		else{
			console.log("entra aqui por el else")
			if (contrato.propietarios[1]._id="") {
				var index = contrato.propietarios[1];
				if (index > -1) {
				   this.vehiculo.impParque.splice(index, 1);
				}	
			}
			
		}
		//console.log(this.usado)
		if(!this.usado._id){
			delete contrato.usado;
		}
		else{
			contrato.usado = this.usado;
		}
		//console.log(contrato);
		this._contratoServicio.putContrato(contrato).subscribe(
			res =>{
				alert("Contrato modificado");
				this.router.navigate(["/tablaContratos"]);
			},
			err => {
				alert("Error al actualizar. " + err);
				this._location.back();
			})
		
		
			
	}

	

	labelPosition = 'after'




}