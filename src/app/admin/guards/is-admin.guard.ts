import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map } from 'rxjs';

export const IsAdminGuard: CanMatchFn = () => {

    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.validateAdminStatus()
        .pipe(
            map(({ ok }) => {

                if (!ok) {
                    router.navigateByUrl('/');
                    localStorage.clear();
                }

                return ok
            })
        );

}