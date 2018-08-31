export class Contrato {
	constructor(
		public _id: string,
		public fechaIngreso: Date,
		public vehiculo: string,
		public propietarios: [any],
		public gastos: string,
		public total: string,
		public sena: string,
		public contado: string,
		public usado: string,
		public montoFinanc: string,
		public cantCuotas: string,
		public importeCuotas: string,
		public adicional: string
		){}
}