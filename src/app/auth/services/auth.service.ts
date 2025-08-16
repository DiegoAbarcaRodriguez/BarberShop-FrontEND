import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/interfaces';
import { environment } from '../../../environments/environment.development';
import { catchError, Observable, of, tap } from 'rxjs';
import { LoginResponse } from '../interfaces';
import { Token } from '@angular/compiler';
import { SecurityService } from '../../shared/services/security.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    mustShowLoginOption = signal<boolean>(false);

    private _url = `${environment.ApiUrl}/auth`;
    private _http = inject(HttpClient);
    private _securityService = inject(SecurityService);


    createAccount(body: User): Observable<{ ok: boolean }> {
        return this._http.post<{ ok: boolean }>(`${this._url}/create`, body);
    }

    validateAccount(id: string, token: string) {
        return this._http.patch(`${this._url}/validate/${id}`, {}, {
            headers: { "x-token": token }
        });
    }

    loginAccount(email: string, password: string): Observable<LoginResponse> {
        return this._http.post<LoginResponse>(`${this._url}/login`, { email, password })
    }

    sendEmailToRecoverPassword(email: string) {
        return this._http.post(`${this._url}/recover-password`, { email });
    }

    updatePassword(id: string, token: string, password: string) {
        return this._http.patch(`${this._url}/update-password/${id}`, { password },
            { headers: { 'x-token': token } }
        );
    }

    validateUserSession(): Observable<{ ok: boolean }> {
        return this._http.get<{ ok: boolean }>(`${this._url}/validate-session`, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })
            .pipe(catchError(() => of({ ok: false })))
    }

    validateAdminStatus(): Observable<{ ok: boolean }> {
        return this._http.get<{ ok: boolean }>(`${this._url}/admin-status`, { headers: { 'Authorization': `Bearer ${this._securityService.token}` } })
            .pipe(catchError(() => of({ ok: false })))
    }


}