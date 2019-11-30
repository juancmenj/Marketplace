import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductosModel } from '../../models/productos.model';
import { ProductosService } from '../../services/home/productos.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevoproducto',
  templateUrl: './nuevoproducto.component.html',
  styleUrls: ['./nuevoproducto.component.css']
})
export class NuevoproductoComponent implements OnInit {

  producto: ProductosModel = new ProductosModel();

  constructor( 
    private productosService: ProductosService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.productosService.getProducto( id )
        .subscribe( (resp: ProductosModel) => {
          this.producto = resp;
          this.producto.id = id;
        });

    }
  }


  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.producto.id ) {
      peticion = this.productosService.actualizarProducto( this.producto );
    } else {
      peticion = this.productosService.crearProducto( this.producto );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.producto.tituloProducto,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });



  }



}
