
export class Vehiculos {
	constructor(
		public _id: string,
		public marca: string,
		public modelo: string,
		public year: number,
		public dominio: string,
		public numeroChasis: string,
		public fechaIngreso: Date,
		public precioVenta: number,
		public titulo: boolean,
		public cedulaVerde: boolean,
		public formularioFirmado: boolean,
		public impParque: [any],
		public verPolicial: boolean,
		public estadoDom: boolean,
		public prenda: boolean,
		public rto: boolean,
		public cedulaGnc: boolean,
		public duplicadoLlave: boolean,
		public manuales: boolean,
		public codigoRadio: boolean,
		public ruedaAuxilio: boolean,
		public llaveRueda: boolean,
		public gato: boolean,
		public observaciones: String,
		public estado: boolean,
		public precioCompra: number,
		public vendedor: {
			_id: string,
			dni: number, 
			nombre: string,
			apellido: string,
			celular: number, 
			email: string ,
			domicilio: string }){

	}
}