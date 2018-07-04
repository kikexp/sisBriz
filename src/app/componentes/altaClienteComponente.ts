import { Component } from '@angular/core'
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';


//MODELOS
import { Clientes } from '../modelos/clientes.modelo';

//SERVICIOS
import { ClienteServicio } from '../servicios/cliente.servicio';


@Component ({
	selector: 'altaClienteComponente',
	templateUrl: '../vistas/altaCliente.html',
	providers:[ClienteServicio]
})

export class altaClienteComponente{

	public cliente: Clientes;
	public url:string;

	constructor(private _clienteServicio:ClienteServicio, private _location: Location){
		this.cliente = new Clientes("","","",null,null,null,null,"","","","","","","",null,"");
		this.url = Ruta.url;
	}


	altaCliente(){
		this._clienteServicio.postCliente(this.url+"altaCliente",this.cliente).subscribe(
			res => {
				alert("Cliente guardado");
				this._location.back();
				console.log("guardado", res);


			},
			err => {
				console.log("error", err);
			}
			);
	}

}