import { Component, OnDestroy,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { RouteService } from 'src/app/core/services/route/route.services';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-detalle-rutas',
  templateUrl: './detalle-rutas.component.html',
  styleUrls: ['./detalle-rutas.component.css']
})
export class DetalleRutasComponent implements OnDestroy {
  public ruta: Ruta | null = null; 
  public existRuta: boolean = true;
  private suscriptionRutaService: Subscription;
  constructor(private readonly route: ActivatedRoute, 
              private readonly rutaService: RouteService, 
              private readonly navbarService: NavbarCommunicationService,
              private readonly router: Router) {
    
    const id: number = this.route.snapshot.params['id'];
    this.navbarService.setActiveSearch(false);
    this.suscriptionRutaService = this.rutaService.getRuta(id)
                                              .subscribe((ruta: Ruta) => {
                                                  this.ruta = ruta;
                                                  this.existRuta = this.ruta != null;
                                              });
  }

  ngOnDestroy(): void {
    this.suscriptionRutaService.unsubscribe();
  }
  calcularDuracion(duracionTotal: number): string {
    const horas = Math.floor(duracionTotal / 60); 
    const minutos = duracionTotal % 60; 
    const horasStr = horas === 1 ? 'hora' : 'horas';
    const minutosStr = minutos === 1 ? 'minuto' : 'minutos';
    return `${horas} ${horasStr} y ${minutos} ${minutosStr}`;
  }
  

}

