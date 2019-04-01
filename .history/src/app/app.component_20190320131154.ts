import { Component, OnInit, ViewChild } from '@angular/core';

import { Ruta } from './rutaglobal';

import { Usuarios } from './modelos/usuarios.modelos';

import { UsuarioServicio } from './servicios/usuario.servicio';
import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ UsuarioServicio ]
})
export class AppComponent implements OnInit {

	@ViewChild('sidenav') sidenav: MatSidenav;


  	public identificado;
	public usuario;
	public listaUsuarios:Usuarios;
	public validarIngreso:boolean = false;
	public mensaje;
	public url:string;

	screenWidth: number;

	constructor(private _servicioUsuarios: UsuarioServicio, public _mediaObserver: MediaObserver) {

		this.listaUsuarios = new Usuarios("","");
		this.url = Ruta.url;

		// set screenWidth on page load
		this.screenWidth = window.innerWidth;
		window.onresize = () => {
		  // set screenWidth on screen size change
		  this.screenWidth = window.innerWidth;
		};

	}

	ngOnInit(){

		//this.identificado = localStorage.getItem("id");
		this.usuario = localStorage.getItem("usuario");
		this.identificado = localStorage.getItem("id");

		console.log(this._mediaObserver.isActive('md'));

	}

	onSubmit(){
		//this.identificado = true;

		this._servicioUsuarios.login(this.listaUsuarios, "true").subscribe(

			resultado => {
				console.log(resultado);
				console.log(this.identificado)

				this.identificado = resultado.token;

				this.usuario = resultado.usuario;

				localStorage.setItem("id", this.identificado);
				localStorage.setItem("usuario", this.usuario);
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

	openNav() {
		document.getElementById("sidebar").classList.add('sidebar-offcanvas');
		console.log("entra")
		// document.getElementById("main").style.marginLeft = "250px";
		document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	  }

}
