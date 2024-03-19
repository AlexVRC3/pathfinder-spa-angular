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
  private suscriptionNavBarService: Subscription;
  private suscriptionRutaService: Subscription;
  constructor(private readonly route: ActivatedRoute, 
              private readonly rutaService: RouteService, 
              private readonly navbarService: NavbarCommunicationService,
              private readonly router: Router) {
    
    const id: number = this.route.snapshot.params['id'];
    this.suscriptionNavBarService = this.navbarService.$data().subscribe((input: string) => {
      if(input != null && input != '') {
        this.router.navigate(['']);
      }
    });

    this.suscriptionRutaService = this.rutaService.getRuta(id)
                                              .subscribe((ruta: Ruta) => {
                                                  this.ruta = ruta;
                                                  this.existRuta = this.ruta != null;
                                              });
  }

  ngOnDestroy(): void {
    this.suscriptionNavBarService.unsubscribe();
    this.suscriptionRutaService.unsubscribe();
  }

}

