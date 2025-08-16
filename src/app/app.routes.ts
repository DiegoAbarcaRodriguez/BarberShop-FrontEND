import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth.routes';
import { clientRoutes } from './client/client.routes';
import { IsClientGuard } from './client/guards/is-client.guard';
import { NotAuthenticatedGuard } from './auth/guards/no-authenticated.guard';


export const routes: Routes = [
    {
        path: '',
        children: authRoutes
    },
    {
        path: 'book',
        children: clientRoutes,
        canMatch: [IsClientGuard]
    },
    {
        path: '**',
        redirectTo: '',
    }
];
