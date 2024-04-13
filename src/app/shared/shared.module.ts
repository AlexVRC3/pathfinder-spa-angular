import { NgModule } from "@angular/core";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoaderComponent } from './components/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from "./components/error/error.component";
import { RouterModule } from "@angular/router";
import { StickButtonComponent } from './components/stick-button/stick-button.component';


@NgModule({
    declarations: [
        NavbarComponent,
        LoaderComponent,
        ErrorComponent,
        StickButtonComponent,
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgxSpinnerModule,
      BrowserAnimationsModule,
      RouterModule
    ],
    exports: [
        NavbarComponent,
        LoaderComponent,
        ErrorComponent,
        StickButtonComponent
    ],
    providers: []
  })
export class SharedModule {}