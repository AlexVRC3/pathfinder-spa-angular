import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ruta } from 'src/app/core/data/ruta.interface';

@Component({
  selector: 'app-start-rutas',
  templateUrl: './start-rutas.component.html',
  styleUrls: ['./start-rutas.component.css']
})
export class StartRutasComponent implements OnInit {
  ruta: Ruta | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Accede a los datos de la ruta pasados a través del enrutamiento
    this.ruta = this.route.snapshot.params.ruta;
  }
}
