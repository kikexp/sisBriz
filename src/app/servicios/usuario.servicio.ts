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

export class UsuarioServicio {

	public token: string;

	public url: string;

	constructor(private _http: Http) {

		this.url = Ruta.url + 'login';
		this.cargarStorage();

	}

	login(listaUsuarios, token){

		listaUsuarios.token = token;

		let parametros = JSON.stringify(listaUsuarios);	

		let headers = new Headers({"Content-Type":"application/json"})

		return this._http.post(this.url, parametros, {headers: headers}).map(resultado => resultado.json())	

	}

	cargarStorage(){
		if(localStorage.getItem('token')){
			this.token = localStorage.getItem('token');
		}
		else{
			this.token = '';
		}
	}
	estaLogueado(){
		return( this.token.length > 5 ) ? true : false;
	}
}

