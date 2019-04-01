export class Clientes{

constructor(

	public _id: string,
	public nombre:string,
	public apellido:string,
	public docTipo:string,
	public dni: number,
	public telefono: number,
	public celular: number,
	public telAlternativo: number,
	public email:string,
	public domicilio:string,
	public ciudad:string,
	public cPostal:string,
	public cuit:string,
	public estadoCivil:string,
	public profesion:string,
	public fecNac: Date,
	public condIva:string,
	public obs: string,
	public urlDni: string,
	public urlRecibo: string

	){}
	
}