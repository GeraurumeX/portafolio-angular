import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Producto } from "../interfaces/producto.interface";
import { resolve } from "../../../node_modules/@types/q";

@Injectable({
  providedIn: "root"
})
export class ProductosService {
  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  private cargarProductos() {
    return new Promise((resolve, reject) => {
      this.http
        .get("https://angular-html-d7c37.firebaseio.com/productos_idx.json")
        .subscribe((resp: Producto[]) => {
          //console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve();
        });
    });
  }

  getProducto(id: string) {
    return this.http.get(
      `https://angular-html-d7c37.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      // esperar a que  se carguen los productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicar filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    console.log(this.productos);
    this.productosFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
