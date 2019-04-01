import { Injectable } from '@angular/core';

import { Ruta } from '../rutaglobal';

// Si vamos a hacer peticiones HTTP debemos importar los siguientes módulos:
import { Http, Response, Headers } from '@angular/http';

// Tambien importamos una librería para Mapear las respuestas HTTP
import 'rxjs/add/operator/map';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url: string;

  constructor(private _http:Http) {
    // tslint:disable-next-line:quotemark
    this.url = Ruta.url;
   }

  subirArchivo( archivo: File, tipo: string, id: string) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      //let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open('POST', this.url + "upload/" + id  + '/' + tipo, true );
      xhr.send( formData );

    });
  }

  descargarArchivo(img: String) {    

    var body = {filename: img};
    
    return this._http.get(this.url + 'download/' +  img,{
        headers:new Headers({"Content-Type":"application/json",
        "Authorization": localStorage.getItem("id")})
    });
  }


}
