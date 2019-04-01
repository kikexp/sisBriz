//Importamos el decorador Injectable, para poder inyectar nuestra clase mediante la inyección de dependencias en los componentes
import { Injectable } from '@angular/core';

// Si vamos a hacer peticiones HTTP debemos importar los siguientes módulos:
import { Http, Response, Headers } from '@angular/http';

// Tambien importamos una librería para Mapear las respuestas HTTP
import 'rxjs/add/operator/map';

// Importamos también el objeto Observable que nos va a permitir utilizar rxjs que es la respuesta del mapeo y trabajar con ello
import { Observable } from 'rxjs/Observable';

import { Ruta } from '../rutaglobal';


@Injectable()

export class ClienteServicio {

	public url:string;

	constructor(private _http:Http){

		this.url = Ruta.url;	
	
	}


	getClientes(){
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});
		return this._http.get( this.url + "verClientes", {headers: headers}).map(res => res.json());

	}


	getCliente(idCliente){
		let headers = new Headers({"Content-Type":"application/json",
                               'Authorization': localStorage.getItem('id')});
		return this._http.get( this.url + 'verCliente/'+ idCliente, {headers: headers}).map(res => res.json());
	}

	getClienteDni ( dniCliente){
		let headers = new Headers({'Content-Type':'application/json',
							   'Authorization': localStorage.getItem('id')});
		return this._http.get( this.url + 'verClienteDni/'+ dniCliente, {headers: headers}).map(res => res.json());

	}


	postCliente(cliente){

		let parametros = JSON.stringify(cliente);	

		let headers = new Headers({'Content-Type':'application/json','Authorization': localStorage.getItem('id')})

		//console.log("paramtros", parametros, headers);

		return this._http.post(this.url + 'altaCliente', parametros, {headers: headers}).map(resultado => resultado.json())	
	}

	putCliente(cliente){
		let parametros = JSON.stringify(cliente);
		
		let headers = new Headers({'Content-Type':'application/json','Authorization': localStorage.getItem('id')});

		return this._http.put(this.url + 'actualizarCliente/' + cliente._id, cliente, {headers: headers}).map(resultado => resultado.json())	
	}

	



	
}


