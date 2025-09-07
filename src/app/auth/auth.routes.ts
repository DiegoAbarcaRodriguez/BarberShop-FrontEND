import { Routes } from "@angular/router";
import { NotAuthenticatedGuard } from "./guards/no-authenticated.guard";


const authRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout/layout.component'),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/login/login.component'),
                data: {
                    title: 'Login',
                    description: 'Enter with your data'
                },
                pathMatch: 'full',
                canMatch: [NotAuthenticatedGuard],
            },
            {
                path: 'create-account',
                loadComponent: () => import('./pages/create/create.component'),
                data: {
                    title: 'Create Account',
                    description: 'Fill out the following form to create an account'
                },
                canMatch: [NotAuthenticatedGuard],
            },
            {
                path: 'confirm-account',
                loadComponent: () => import('./pages/confirm-account/confirm-account.component'),
                data: {
                    title: 'Confirm your account',
                    description: 'We sent to your email the instructions to confirm your account'
                },
                canMatch: [NotAuthenticatedGuard],
            },
            {
                path: 'forget-password',
                loadComponent: () => import('./pages/forget-password/forget-password.component'),
                data: {
                    title: 'Forget Password',
                    description: 'Retrieving your password by writing your email below'
                },
                canMatch: [NotAuthenticatedGuard],
            },
            {
                path: 'recover-password',
                loadComponent: () => import('./pages/recover-password/recover-password.component'),
                data: {
                    title: 'Recover your password',
                    description: 'Writing your new password below'
                },
                canMatch: [NotAuthenticatedGuard],
            }
        ]
    }
];

export default authRoutes;