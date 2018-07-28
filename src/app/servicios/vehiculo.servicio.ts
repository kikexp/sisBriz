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
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});
		return this._http.get( this.url + "/verVehiculos", {headers: headers}).map(res => res.json());

	}


	postVehiculos(vehiculo){

		let parametros = JSON.stringify(vehiculo);	

		let headers = new Headers({"Content-Type":"application/json","Authorization": localStorage.getItem("id")})

		console.log("paramtros", parametros, headers);

		return this._http.post(this.url + "altaVehiculo", parametros, {headers: headers}).map(resultado => resultado.json())	
	}

	getVehiculo(idVehiculo){
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});
		return this._http.get( this.url + "verVehiculo/"+ idVehiculo, {headers: headers}).map(res => res.json());
	}

	putVehiculo(vehiculo){
		let parametros = JSON.stringify(vehiculo);
		
		let headers = new Headers({"Content-Type":"application/json","Authorization": localStorage.getItem("id")});

		return this._http.put(this.url + "actualizarVehiculo/" + vehiculo._id, vehiculo, {headers: headers}).map(resultado => resultado.json())	
	}


	
}