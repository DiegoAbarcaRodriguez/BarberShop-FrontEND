import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecurityService {
    constructor() { }

    private _token = signal(localStorage.getItem('token') || '');

    set token(token: string) {
        if (!token) return;
        this._token.set(token);
        localStorage.setItem('token', token);
    }

    get token() {
        return this._token();
    }

    clearToken() {
        this._token.set('');
        localStorage.removeItem('token');
    }


}