import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployesComponent } from './employes/employes.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { RechercheEmployeComponent } from './recherche-employe/recherche-employe.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { EmployesActionRendererComponent } from './employes-action-renderer/employes-action-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployesComponent,
    RechercheEmployeComponent,
    ConfirmDialogComponent,
    EmployesActionRendererComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule, MatDialogModule,
    AgGridModule.withComponents([EmployesActionRendererComponent])
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
