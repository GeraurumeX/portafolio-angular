import { Component, OnInit } from "@angular/core";
import { InfoPaginaService } from "../../services/info-pagina.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  //infoPaginaService  =  propiedad
  //_servicio  =  servicio
  constructor(public _servicio: InfoPaginaService, private router: Router) {}

  ngOnInit() {}

  buscarProducto(termino: string) {
    if (termino.length < 1) {
      return;
    }
    this.router.navigate(["/search", termino]);
    //console.log(termino);
  }
}
