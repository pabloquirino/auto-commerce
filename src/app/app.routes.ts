import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'layout',
        loadChildren: () =>
            import('./layout/layout.routes')
                .then(m => m.layout_routes),
    },
];
