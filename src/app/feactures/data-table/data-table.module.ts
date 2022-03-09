import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DataTableRoutingModule } from './data-table-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DataTableRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DataTableModule { }
