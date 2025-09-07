import { inject } from '@angular/core';
import { CanMatchFn, Router, Route } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map, switchMap, tap } from 'rxjs';
import { SecurityService } from '../../shared/services/security.service';
import { TimingService } from '../../shared/services/timing.service';

export const IsClientGuard: CanMatchFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const securityService = inject(SecurityService);
    const timingService = inject(TimingService);

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
                    timingService.stopCounterToShowAlert();
                    securityService.clearToken();
                    router.navigateByUrl('/');
                }



                return ok;
            })
        );


}