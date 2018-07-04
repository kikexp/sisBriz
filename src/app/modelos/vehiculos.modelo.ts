export class Vehiculos {
	constructor(
		public marca: String,
		public modelo: String,
		public año: Number,
		public dominio: String,
		public numeroChasis: String,
		public fechaIngreso: Date,
		public precioVenta: Number,
		public titulo: Boolean,
		public cedulaVerde: Boolean,
		public formularioFirmado: Boolean,
		public impParque: [{}],
		public verPolicial: Boolean,
		public estadoDom: Boolean,
		public prenda: Boolean,
		public rto: Boolean,
		public cedulaGnc: Boolean,
		public duplicadoLlave: Boolean,
		public manuales: Boolean,
		public codigoRadio: Boolean,
		public ruedaAuxilio: Boolean,
		public llaveRueda: Boolean,
		public gato: Boolean,
		public observaciones: String){

	}
}