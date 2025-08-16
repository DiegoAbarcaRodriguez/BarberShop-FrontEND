import { Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";

const clientRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'services',
                loadComponent: () => import('./pages/servings/servings.component')
            },
            {
                path: 'appointment',
                loadComponent: () => import('./pages/appointment/appointment.component')
            },
            {
                path: 'summary',
                loadComponent: () => import('./pages/summary/summary.component')
            },
            {
                path: '**',
                redirectTo: 'services',
            }
        ]
    }
]

export default clientRoutes;