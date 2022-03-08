import { NgModule } from '@angular/core';
import { HomeComponent } from './components';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataTableRoutingModule { }
