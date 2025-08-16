import { inject } from '@angular/core';
import { CanMatchFn, Router, Route } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map } from 'rxjs';

export const IsClientGuard: CanMatchFn = () => {
    const _authService = inject(AuthService);
    const _router = inject(Router);

    return _authService.validateUserSession()
        .pipe(map(({ ok }) => {


            if (!ok) {
                _router.navigateByUrl('/');
                localStorage.clear();
            }


            return ok;
        }));
}