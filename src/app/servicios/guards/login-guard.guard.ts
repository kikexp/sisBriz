import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioServicio } from '../usuario.servicio';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _UsuarioServicio: UsuarioServicio, public router: Router) {

  }

  canActivate() {
    if( this._UsuarioServicio.estaLogueado() ){
      console.log("pasa el guard");
      return true;
    
    } else
    {
      console.log("bloqueado por el guard");
      this.router.navigate(['/login'])
      return false;
    }
   
  }
}
