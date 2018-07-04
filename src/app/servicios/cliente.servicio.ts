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
		return this._http.get( this.url + "/verClientes").map(res => res.json());

	}


	postCliente(url, cliente){

		let parametros = JSON.stringify(cliente);	

		let headers = new Headers({"Content-Type":"application/json"})

		console.log("paramtros", parametros, headers);

		return this._http.post(this.url + "altaCliente", parametros, {headers: headers}).map(resultado => resultado.json())	
	}



	
}


