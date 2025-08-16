import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';


export const NotAuthenticatedGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    console.log('hpla')

    return authService.validateUserSession()
        .pipe(
            map(({ ok }) => {

                if (ok) {
                    router.navigateByUrl('/book/services');
                }

                return !ok;
            }));
}