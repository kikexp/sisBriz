import { Pipe, PipeTransform } from '@angular/core';
import { Ruta } from '../rutaglobal';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string): any {

    return Ruta.url + 'download/' + img;
  }

}
