import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DataTableRoutingModule } from './data-table-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DataTableRoutingModule

  ]
})
export class DataTableModule { }
