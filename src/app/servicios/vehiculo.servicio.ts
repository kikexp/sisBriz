import { Injectable } from '@angular/core';

// Si vamos a hacer peticiones HTTP debemos importar los siguientes módulos:
import { Http, Response, Headers } from '@angular/http';

// Tambien importamos una librería para Mapear las respuestas HTTP
import 'rxjs/add/operator/map';

// Importamos también el objeto Observable que nos va a permitir utilizar rxjs que es la respuesta del mapeo y trabajar con ello
import { Observable } from 'rxjs/Observable';

import { Ruta } from '../rutaglobal';

@Injectable()

export class VehiculoServicio {

	public url:string;

	constructor(private _http:Http){

		this.url = Ruta.url;	
	
	}


	getVehiculos(){
		return this._http.get( this.url + "verVehiculos").map(res => res.json());

	}


	postVehiculos(url, cliente){

		let parametros = JSON.stringify(cliente);	

		let headers = new Headers({"Content-Type":"application/json"})

		console.log("paramtros", parametros, headers);

		return this._http.post(this.url + "altaVehiculo", parametros, {headers: headers}).map(resultado => resultado.json())	
	}



	
}