import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from "@clr/angular";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TasksComponent } from "./components/tasks/tasks.component";
import { BadInterceptor } from "./interceptors/http";

import { HttpClientModule } from "@angular/common/http";
import { AlertComponent } from './components/alert/alert.component';
import { TaskFilter } from './pipes/task.pipe';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BadInterceptor, multi: true },
];

@NgModule({
  declarations: [AppComponent, TasksComponent, AlertComponent, TaskFilter],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
