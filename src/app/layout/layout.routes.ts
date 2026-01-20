import { Routes } from '@angular/router';

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
                loadComponent: () =>
                    import('./explorar/explorar.component')
                        .then(m => m.ExplorarComponent),
            },
            {
                path: 'anunciar',
                loadComponent: () =>
                    import('./anunciar/anunciar.component')
                        .then(m => m.AnunciarComponent),
            },
            {
                path: 'meus-anuncios',
                loadComponent: () =>
                    import('./meus-anuncios/meus-anuncios.component')
                        .then(m => m.MeusAnunciosComponent),
            },
        ],
    },
];
