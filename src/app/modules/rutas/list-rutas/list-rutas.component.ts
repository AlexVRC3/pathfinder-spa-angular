import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Ruta } from 'src/app/core/data/ruta.interface';
import { RouteService } from 'src/app/core/services/route/route.services';
import { NavbarCommunicationService } from 'src/app/shared/services/navbar.service';
@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrls: ['./list-rutas.component.css']
})
export class ListRutasComponent implements OnDestroy {
  private suscriptionNavBarService: Subscription;
  public foundRuta: boolean = true;
  public listRutas: Ruta[] = [];
  
  constructor(private router: Router, private readonly navBarServices: NavbarCommunicationService, private readonly rutaService: RouteService) { 
    this.suscriptionNavBarService = this.navBarServices.$data().pipe(
      switchMap((input: string) => {
        return this.rutaService.getListRoute(input);
      })
    ).subscribe((data: Ruta[]) => {
      this.listRutas = data;
      this.foundRuta = this.listRutas.length > 0;
    });
  }
  
  ngOnDestroy(): void {
    this.suscriptionNavBarService.unsubscribe();
  }

  verDetalles(ruta: Ruta): void {
    this.router.navigate(['/ruta', { ruta }]);
  }
}
