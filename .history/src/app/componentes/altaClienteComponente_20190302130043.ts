import { LOCALE_ID,Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';
import {ActivatedRoute, Router} from "@angular/router";
import * as jsPDF from 'jspdf';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material'
// MODELOS
import { Clientes } from '../modelos/clientes.modelo';

// SERVICIOS
import { ClienteServicio } from '../servicios/cliente.servicio';
import { fbind } from 'q';
import { UploadService } from '../servicios/upload.service';
import {saveAs} from 'file-saver';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { altaVehiculoComponente } from './altaVehiculoComponente';
// tslint:disable-next-line:indent


@Component ({
	selector: 'altaClienteComponente',
	templateUrl: '../vistas/altaCliente.html',
	providers: [ ClienteServicio, { provide: LOCALE_ID, useValue: 'es-Ar' }, UploadService]
})

export class altaClienteComponente implements OnInit {

	public cliente: Clientes;
	public url: string;
	public parmUrl;
	public mensajeC;
	imagenSubir: File;
	imagenTemp: string;
	constructor(private _uploadService: UploadService,
		// tslint:disable-next-line:max-line-length
		private dialogRef: MatDialogRef<altaClienteComponente>,
		private fb: FormBuilder, private _clienteServicio: ClienteServicio, private _location: Location, private route: ActivatedRoute, private router: Router) {
		this.cliente = new Clientes('', '', '', '', null, null, null, null, '', '', '', '', '', '', '', null, '', '');
		this.url = Ruta.url;
		this.route.params.subscribe( params => this.parmUrl = params['id']);
	}


	formCliente = this.fb.group({
		docTipo: ['', [Validators.required]],
		dni: ['', [Validators.required]],
		nombre: ['', [Validators.required]],
		apellido: ['', [Validators.required]],
		celular: ['', [Validators.required]],
		domicilio: ['', [Validators.required]],
		cuidad: ['', [ Validators.required]],
		estadoCivil: ['', [Validators.required]],
		fecNac: ['', [Validators.required]]
	});

	ngOnInit() {
		setTimeout(() => {

			this._clienteServicio.getCliente(this.parmUrl).subscribe(

			res => {
				this.cliente = res.cliente;
				console.log(res.cliente);
				console.log(this.cliente.nombre);
				console.log(this.parmUrl);
			},
			err => {
				console.log('No pasa nada');
			}

			);
		}, 10);

	}


	altaCliente() {
		delete this.cliente._id;
		this._clienteServicio.postCliente(this.cliente).subscribe(
			res => {
				swal('Cliente guardado!', 'El cliente fue guardado exitosamente', 'success').then(() => {
					//this.router.navigate(['/tablaClientes']);
					console.log('guardado', res);
					this.dialogRef.close();
				});

			},
			err => {
				console.log('error', err);
			}
			);
	}


	guardarDetalleCliente(cliente) {
		this._clienteServicio.putCliente(cliente).subscribe(
			res => {
				alert('Cliente modificado');
				this.router.navigate(['/tablaClientes']);
			},
			err => {
				alert('Error al actualizar. ' + err);
				this._location.back();
			}
			);
	}



	buscarCliente (clientePrm) {
		// console.log("entra");
		this.mensajeC = null;
		this._clienteServicio.getCliente(clientePrm).subscribe(

			res => {
				console.log(res);
				this.cliente = res.cliente;

			},
			err => {
				console.log(err);
				this.mensajeC = JSON.parse(err._body).mensaje;
				this.cliente = new Clientes('', '', '', '', null, null, null, null, '', '', '', '', '', '', '', null, '', '');
			}

			);
	}

	seleccionImage(archivo: File) {
		if ( !archivo ) {
			this.imagenSubir = null;
			return;
		  }

		  if ( archivo.type.indexOf('image') < 0 ) {
			swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
			this.imagenSubir = null;
			return;
		  }
		  this.imagenSubir = archivo;

		  const reader = new FileReader();
		  const urlImagenTemp = reader.readAsDataURL( archivo );

		  reader.onloadend = () => this.imagenTemp = reader.result;
	}

	descargar(img) {
		saveAs(this.url + 'download/' +  img, img);
	}





}
