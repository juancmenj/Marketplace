import { Component, OnInit } from '@angular/core';
import { ProductosModel } from '../../models/productos.model';
import { ProductosService } from '../../services/home/productos.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //propiedades
  productos:  ProductosModel[] = [];
  header: any[]=[];
  cargando = false;

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.cargando = true;

    this.productosService.getHeader()
    .subscribe( resp => {
      this.header = resp;
      this.cargando = false;
    });

    this.productosService.getProductos()
    .subscribe( resp => {
      this.productos = resp;
      this.cargando = false;
    });
  }

  precioProductoFinal( producto: ProductosModel){
    let regular = producto.precioRegular;
    let descuento = producto.descuento;
    let tipo = producto.tipo_descuento;
    let precioFinal;


    if( tipo === false ){
      precioFinal = regular - (( regular * descuento )/100);
    } else {
      precioFinal = regular - descuento;
    }

    return precioFinal;
  }

  precioProductoRegular( producto: ProductosModel){
    let regular = producto.precioRegular;
    return regular;
  }

}
