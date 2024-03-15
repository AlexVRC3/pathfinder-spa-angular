import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { RouteService } from 'src/app/core/services/route/route.services';

@Component({
  selector: 'app-detalle-rutas',
  templateUrl: './detalle-rutas.component.html',
  styleUrls: ['./detalle-rutas.component.css']
})
export class DetalleRutasComponent implements OnInit {
  rutaId!: number | null;
  ruta?: Ruta; // Objeto para almacenar los datos de la ruta

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService // Inyecta tu servicio de rutas
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id'); // Obtener el valor del parámetro como cadena
      this.rutaId = idString ? +idString : null; // Convertir la cadena a número utilizando el operador "+" (o parseInt)
      if (this.rutaId !== null) {
        this.obtenerRuta();
      }
    });
  }

  obtenerRuta() {
    // Llama al servicio para obtener los datos de la ruta por su ID
    this.routeService.getRutaById(this.rutaId!).subscribe(ruta => {
      this.ruta = ruta;
      // Aquí puedes hacer lo que necesites con los datos de la ruta, como mostrarlos en tu componente HTML
    });
  }

}
