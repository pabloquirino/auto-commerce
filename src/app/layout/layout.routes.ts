import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const layout_routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'explorar',
                pathMatch: 'full',
            },
            {
                path: 'explorar',
                loadComponent: () => import('./explorar/explorar.component').then(m => m.ExplorarComponent),
                canActivate: [authGuard],
                        
            },
            {
                path: 'anunciar',
                loadComponent: () =>import('./anunciar/anunciar.component').then(m => m.AnunciarComponent),
                canActivate: [authGuard],
            },
            {
                path: 'editar/:id',
                loadComponent: () =>import('./anunciar/anunciar.component').then(m => m.AnunciarComponent),
                canActivate: [authGuard],
            },
            {
                path: 'meus-anuncios',
                loadComponent: () => import('./meus-anuncios/meus-anuncios.component').then(m => m.MeusAnunciosComponent),
                canActivate: [authGuard],
            },
        ],
    },
];
