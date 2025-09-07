import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map } from 'rxjs';
import { SecurityService } from '../../shared/services/security.service';
import { TimingService } from '../../shared/services/timing.service';

export const IsAdminGuard: CanMatchFn = () => {

    const authService = inject(AuthService);
    const router = inject(Router);
    const securityService = inject(SecurityService);
    const timingService = inject(TimingService);

    return authService.validateAdminStatus()
        .pipe(
            map(({ ok }) => {

                if (!ok) {
                    timingService.stopCounterToShowAlert();
                    securityService.clearToken();
                    router.navigateByUrl('/');
                }

                return ok
            })
        );

}