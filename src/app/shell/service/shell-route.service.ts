import { Injectable } from '@angular/core';
import { Route, Routes } from '@angular/router';

import { ShellComponent } from '../component/shell.component';

@Injectable({
  providedIn: 'root'
})
export class ShellRouteService {

  constructor() { }

  /**
   * Create routes using the shell component
   * @param routes
   * @returns
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [],

      //Reuse ShellComponent instance when navigating between child views
      data: {
        reuse: true,
      },
    };
  }
}
