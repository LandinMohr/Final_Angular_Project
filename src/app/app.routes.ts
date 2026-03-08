import { Routes } from '@angular/router';

export const routes: Routes = [

  // Home page
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home').then(m => m.Home),
    title: 'Home'
  },

  // Create new object
  {
  path: 'objects/new',
  loadComponent: () =>
    import('./features/objects/object-create/object-create')
      .then(m => m.ObjectCreate)
},

{
  path: 'objects/:id/edit',
  loadComponent: () =>
    import('./features/objects/object-edit/object-edit')
      .then(m => m.ObjectEdit)
},

  // View object details
  {
    path: 'objects/:id',
    loadComponent: () =>
      import('./features/objects/object-details/object-details')
        .then(m => m.ObjectDetails),
    title: 'Object Details'
  },

  // List all objects
  {
    path: 'objects',
    loadComponent: () =>
      import('./features/objects/objects-list/objects-list')
        .then(m => m.ObjectsList),
    title: 'Objects'
  },

  // 404 fallback
  {
    path: '**',
    loadComponent: () =>
      import('./shared/not-found/not-found')
        .then(m => m.NotFound),
    title: 'Not Found'
  }

];