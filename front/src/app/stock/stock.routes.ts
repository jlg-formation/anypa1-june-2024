import { Routes } from '@angular/router';

export const stockRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/list.component'),
  },
  {
    path: 'create',
    loadComponent: () => import('./create/create.component'),
  },
];
