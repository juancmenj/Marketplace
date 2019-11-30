export class ProductosModel {

    id: string;
    empresa: string;
    tituloProducto: string;
    precioRegular: number;
    descripcion: string;
    imagenProducto: string;
    descuento: number;
    tipo_descuento: boolean;
    precioFinal: string;
    moneda_simbol: string;

    constructor() {
    }

}
