import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
    title: 'Home'
  },
  {
    path: 'objects',
    loadComponent: () =>
      import('./features/objects/objects-list/objects-list')
        .then(m => m.ObjectsList),
    title: 'Objects'
  },
  {
    path: 'objects/new',
    loadComponent: () =>
      import('./features/objects/object-form/object-form')
        .then(m => m.ObjectForm),
    title: 'Create Object'
  },
  {
    path: 'objects/:id',
    loadComponent: () =>
      import('./features/objects/object-details/object-details')
        .then(m => m.ObjectDetails),
    title: 'Object Details'
  },
  {
    path: 'objects/:id/edit',
    loadComponent: () =>
      import('./features/objects/object-form/object-form')
        .then(m => m.ObjectForm),
    title: 'Edit Object'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login),
    title: 'Login'
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found')
        .then(m => m.NotFound),
    title: '404 - Not Found'
  }
];