export class Contrato {
	constructor(
		public _id: string,
		public fechaIngreso: Date,
		public vehiculo: string,
		public propietarios: [any],
		public gastos: number,
		public total: number,
		public sena: number,
		public contado: number,
		public usado: string,
		public montoFinanc: number,
		public cantCuotas: number,
		public importeCuotas: string,
		public adicional: string
		){}
}