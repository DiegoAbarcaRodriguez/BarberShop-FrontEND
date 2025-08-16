import { Routes } from "@angular/router";

const adminRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout.component'),
        children: [
            {
                path: 'appointments',
                loadComponent: () => import('./pages/appointments/appointments.component')
            },
            {
                path: 'servings',
                loadComponent: () => import('./pages/servings/servings.component')
            },

            {
                path: 'add-update-service',
                loadComponent: () => import('./pages/add-update-service/add-update-service.component')
            },
            {
                path: '**',
                redirectTo: 'appointments'
            }
        ]
    }
];

export default adminRoutes;