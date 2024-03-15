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
  ruta?: Ruta; 

  constructor(
    private route: ActivatedRoute,
    private routeService: RouteService 
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idString = params.get('id'); 
      this.rutaId = idString ? +idString : null; 
      if (this.rutaId !== null) {
        this.obtenerRuta();
      }
    });
  }

  obtenerRuta() {
    this.routeService.getRutaById(this.rutaId!).subscribe(
      ruta => {
        this.ruta = ruta;
        console.log('Ruta obtenida:', this.ruta);
      },
      error => {
        console.error('Error al obtener la ruta:', error);
      }
    );
  }
  

}
