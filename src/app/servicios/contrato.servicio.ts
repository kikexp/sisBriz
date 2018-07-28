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

export class ContratoServicio {

	public url:string;

	constructor(private _http:Http){

		this.url = Ruta.url;	
	
	}


	getContratos(){
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});
		return this._http.get( this.url + "/verContratos", {headers: headers}).map(res => res.json());

	}


	getContrato(idContrato){
		let headers = new Headers({"Content-Type":"application/json",
                               "Authorization": localStorage.getItem("id")});
		return this._http.get( this.url + "verContrato/"+ idContrato, {headers: headers}).map(res => res.json());
	}


	postContrato(contrato){

		let parametros = JSON.stringify(contrato);	

		let headers = new Headers({"Content-Type":"application/json","Authorization": localStorage.getItem("id")})

		//console.log("paramtros", parametros, headers);

		return this._http.post(this.url + "altaContrato", parametros, {headers: headers}).map(resultado => resultado.json())	
	}

	putContrato(Contrato){
		let parametros = JSON.stringify(Contrato);
		
		let headers = new Headers({"Content-Type":"application/json","Authorization": localStorage.getItem("id")});

		return this._http.put(this.url + "actualizarContrato/" + Contrato._id, Contrato, {headers: headers}).map(resultado => resultado.json())	
	}

	



	
}