import { Component, OnInit } from '@angular/core';

import { Ruta } from '../rutaglobal';

import { Usuarios } from '../modelos/usuarios.modelos';

import { UsuarioServicio } from '../servicios/usuario.servicio';

import {Router} from '@angular/router';

@Component ({
	selector: 'login',
	templateUrl: '../vistas/login.html',
	providers: [UsuarioServicio]

})

export class loginComponente implements OnInit{

  	public identificado;
	public usuario;
	public listaUsuarios:Usuarios;
	public validarIngreso:boolean;
	public mensaje;
	public url:string;


	constructor(private _servicioUsuarios:UsuarioServicio, private router: Router){

		this.listaUsuarios = new Usuarios("","");
		this.url = Ruta.url;


	}

	ngOnInit(){

		//this.identificado = localStorage.getItem("id");
		this.usuario = localStorage.getItem("usuario");

	}

	onSubmit(){
		this.identificado = true;

		this._servicioUsuarios.login(this.listaUsuarios, "true").subscribe(

			resultado => {
				console.log(resultado);
				console.log(this.identificado)

				this.identificado = resultado.token;

				this.usuario = resultado.usuario;

				localStorage.setItem("id", this.identificado);
				localStorage.setItem("usuario", this.usuario);
				this.router.navigate(['/tablaClientes']);
			
			},
			error => {
				
				this.validarIngreso = true;
				var errorMensaje = JSON.parse(error._body);
				this.mensaje = errorMensaje.mensaje;

			}

		)

	}

	cerrarSesion(){

		localStorage.removeItem("id");
		localStorage.removeItem("usuario");
		localStorage.clear();
		this.identificado = null;
		this.usuario = null;

	}
	
}