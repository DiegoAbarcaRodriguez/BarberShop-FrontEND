import { Routes } from '@angular/router';
import { IsClientGuard } from './client/guards/is-client.guard';
import { IsAdminGuard } from './admin/guards/is-admin.guard';




export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./auth/auth.routes'),
    },
    {
        path: 'book',
        loadChildren: () => import('./client/client.routes'),
        canMatch: [IsClientGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.routes'),
        canMatch: [IsAdminGuard]
    },
    {
        path: '**',
        redirectTo: '',
    }
];
