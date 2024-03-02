import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        NavbarComponent,
        LoaderComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxSpinnerModule,
      BrowserAnimationsModule
    ],
    exports: [
        NavbarComponent,
        LoaderComponent
    ],
    providers: []
  })
export class SharedModule {}