import { inject } from '@angular/core';
import { CanMatchFn, Router, Route } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map, switchMap, tap } from 'rxjs';

export const IsClientGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    let isAdmin: boolean;

    return authService.validateAdminStatus()
        .pipe(
            tap(({ ok }) => isAdmin = ok),
            switchMap(() => authService.validateUserSession()),
            map(({ ok }) => {

                if (isAdmin) {
                    router.navigateByUrl('/admin');
                    return false;
                }


                if (!ok) {
                    router.navigateByUrl('/');
                    localStorage.clear();
                }



                return ok;
            })
        );


}