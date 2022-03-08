import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellRouteService } from './shell/service/shell-route.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./feactures/home/home.module').then((m) => m.HomeModule),
  },

  //Shell
  ShellRouteService.childRoutes([
    { path: '', redirectTo: '/table', pathMatch: 'full' },

    {
      path: 'table',
      loadChildren: () =>
        import('./feactures/data-table/data-table.module').then((m) => m.DataTableModule),
    },
  ]),

  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
