export class Cheques {
	constructor(
		public numero: number,
		public banco: string,
		public monto: string,
		public vencimiento: Date,
		public recepcion: Date,
		public motivo: string,
		public librador: {},
		public entregador: {},
		public concepto: string,
		public observaciones: string
		){}
}