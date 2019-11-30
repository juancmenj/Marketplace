import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosModel } from '../../models/productos.model';
import { map, delay } from 'rxjs/operators';

@Injectable()
export class ProductosService {


  //URL a la base de datos no relacional FireBase
  private url = 'https://marketplace-c503c.firebaseio.com/';

  constructor( private http: HttpClient ) { }

  crearProducto( productos: ProductosModel ) {

    return this.http.post(`${ this.url }/productos.json`, productos)
      .pipe(
        map( (resp: any) => {
          productos.id = resp.nombre; //name
          return productos;
        })
      );
  }

  actualizarProducto( producto: ProductosModel ) {
    const productoTemp = {
      ...producto
    };

    delete productoTemp.id;
    return this.http.put(`${ this.url }/productos/${ producto.id }.json`, productoTemp);

  }

  /*borrarProduto( id: string ) {
    return this.http.delete(`${ this.url }/productos/${ id }.json`);
  }*/


  getProducto( id: string ) {
    return this.http.get(`${ this.url }/productos/${ id }.json`);
  }

  getProductos() {
    return this.http.get(`${ this.url }/productos.json`)
    .pipe(
      map( resp => this.crearArreglo(resp) ),
      delay(0)
    );
  }

  getHeader() {
    return this.http.get(`${ this.url }/header.json`)
    .pipe(
      map( resp => this.crearArregloHeader(resp) ),
      delay(0)
    );
  }

  private crearArreglo( productoObj: object ) {

    const productos: ProductosModel[] = [];

    Object.keys(  productoObj ).forEach( key => {

      const producto: ProductosModel =  productoObj[key];
      producto.id = key;

      productos.push(  producto );
    });

    return productos;

  }


  private crearArregloHeader( headerObj: object ) {

    const headers:any[] = [];

    Object.keys( headerObj ).forEach( key => {

      const header: any =  headerObj[key];
      header.id = key;

      headers.push( header );
    });

    return headers;

  }

}
