export interface ProductOrder {
    id:               number;
    estado:           string;
    fechaCreacion:    Date;
    fechaEntrega:     null;
    direccionEntrega: null;
    cliente:          string;
    pagado:           boolean;
    productos:        Producto[];
    total:            string;
}

export interface Producto {
    id:          number;
    nombre:      string;
    descripcion: null;
    imagen:      null;
    precio:      number;
    cantidad:    number;
    subTotal:    string;
}
