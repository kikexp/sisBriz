import { LOCALE_ID,Component, OnInit } from '@angular/core'
import {Location} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Ruta } from '../rutaglobal';
import {ActivatedRoute, Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


//MODELOS
import { Cheques } from '../modelos/cheque.modelo';
import { Clientes } from '../modelos/clientes.modelo';

//SERVICIOS
import { ChequesServicio } from '../servicios/cheques.servicio';
import { ClienteServicio } from '../servicios/cliente.servicio'; 


@Component({
	selector: "altaChequeComponente",
	templateUrl: "../vistas/altaCheque.html",
	providers: [ChequesServicio, ClienteServicio,  { provide: LOCALE_ID, useValue: 'es-Ar' }]

})

export class altaChequeComponente {

	public cheque: Cheques;
	public cliente: Clientes;
	public url:string;
	public parmUrl;
	public librador;
	

	constructor(public dialogRef: MatDialogRef<altaChequeComponente>,private fb:FormBuilder, private _chequeServicio:ChequesServicio, private _clienteServicio: ClienteServicio, private _location: Location, private route: ActivatedRoute, private router: Router){
		this.cheque = new Cheques("",null,"","",null,null,"",{},"","","", true);
		this.cliente = new Clientes("","","","",null,null,null,null,"","","","","","","",null,"","","","");
		this.librador = {nombre: null, contacto: null,direccion: null}
		this.url = Ruta.url;

		this.route.params.subscribe( params => this.parmUrl= params['id']);

	}

	form = this.fb.group({
		numero: ['', Validators.required],
		banco: ['',Validators.required],
		monto: [''],
		vencimiento: [''],
		concepto: ['']
	});

	ngOnInit(){
		setTimeout(()=>{

			this._chequeServicio.getCheque(this.parmUrl).subscribe(

			res=> {
				//this.cheque = res.Cheque;
				console.log(res);
			},
			err =>{
				console.log("No pasa nada");
			}

			);
		}, 10);

	}


	onSubmit(){

		this.cheque.librador = this.librador;
		this.cheque.entregador = this.cliente._id;
		console.log(this.cheque);
		delete this.cheque._id;
		this._chequeServicio.postCheque(this.cheque).subscribe(
			res => {
				alert("Cheque guardado");
				this.dialogRef.close();
				//this._location.back();
				console.log("guardado", res);


			},
			err => {
				console.log("error", err);
			}
			);
	}

	buscarCliente (clientePrm){

		this._clienteServicio.getClienteDni(clientePrm).subscribe(

			res=> {
				this.cliente = res.cliente;

			},
			err =>{
				console.log(err);
			}

			);
	}


	guardarDetalleCheque(cheque){
		this._chequeServicio.putCheque(cheque).subscribe(
			res =>{
				alert("Cheque modificado");
				//this.router.navigate(["/tablaCheques"]);
			},
			err => {
				alert("Error al actualizar. " + err);
				//this._location.back();
			}
			)
	}

}