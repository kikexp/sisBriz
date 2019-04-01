import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../servicios/upload.service';

import {saveAs} from 'file-saver';

import swal from 'sweetalert';

@Component({
  selector: 'app-imagenes-component',
  templateUrl: './imagenes-component.component.html',
  styleUrls: ['./imagenes-component.component.css']
})
export class ImagenesComponentComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: any;

  constructor(private _uploadService: UploadService) { }

  ngOnInit() {
  }

  seleccionImage( archivo: File ) {

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

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  // subirImagen() {

  //   this._uploadService.subirArchivo( this.imagenSubir )
  //         .then( resp => {

  //           swal("Listo!" , "Imagen cargada", "success");

  //         })
  //         .catch( err => {
  //           console.log( 'Error en la carga... ');
  //         });

  // }

  descargar(img) {

      this._uploadService.descargarArchivo(img)
          .subscribe(
              data => saveAs(data, img),
              error => console.error(error)
      );

  }

}
