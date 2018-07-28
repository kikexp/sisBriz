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

export class  ChequesServicio {
	public url:string;

	constructor(private _http:Http){

		this.url = Ruta.url;	
	
	}

	getCheques(){
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});

		return this._http.get(this.url + "verCheques", {headers: headers}).map(res=> res.json());
	}

	getCheque(idCheque){
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});
		return this._http.get( this.url + "verCheque/"+ idCheque, {headers: headers}).map(res => res.json());
	}


	postCheque(Cheque){

		let parametros = JSON.stringify(Cheque);	

		let headers = new Headers({"Content-Type":"application/json","Authorization": localStorage.getItem("id")})


		return this._http.post(this.url + "altaCheque", parametros, {headers: headers}).map(resultado => resultado.json())	
	}

	putCheque(Cheque){
		let parametros = JSON.stringify(Cheque);
		
		let headers = new Headers({"Content-Type":"application/json","Authorization": localStorage.getItem("id")});

		return this._http.put(this.url + "actualizarCheque/" + Cheque._id, Cheque, {headers: headers}).map(resultado => resultado.json())	
	}
}