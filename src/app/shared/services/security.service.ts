import { Injectable, Signal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SecurityService {
    constructor() { }

    private _token = signal('');

    set token(token: string) {
        if (!token) return;
        this._token.set(token);
    }

    get token() {
        return this._token();
    }

    clearToken() {
        this._token.set('');
    }


}